from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the build directory to the path to find the compiled module
sys.path.append(os.path.join(os.path.dirname(__file__), 'build'))

try:
    import FairXORNG
except ImportError:
    print("Error: FairXORNG module not found. Make sure to build the C++ code first.")
    print("Run: cmake -B build && cmake --build build")
    sys.exit(1)

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route('/api/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    
    if not data or 'classes' not in data:
        return jsonify({"error": "Missing 'classes' in request body"}), 400
    
    try:
        # Convert JSON data to ProbabilityClass objects
        prob_classes = []
        for cls in data['classes']:
            pc = FairXORNG.ProbabilityClass()
            pc.classLabel = cls['classLabel']
            pc.initialProbability = cls['initialProbability']
            pc.incrementalBiasRate = cls['incrementalBiasRate']
            pc.consecutiveFailures = cls['consecutiveFailures']
            pc.deterministicLimit = cls['deterministicLimit']
            
            # Convert outcome categories
            for outcome in cls['categoryOutcomes']:
                oc = FairXORNG.OutcomeCategory()
                oc.label = outcome['label']
                oc.weight = outcome['weight']
                pc.categoryOutcomes.append(oc)
                
            prob_classes.append(pc)
        
        # Call the C++ algorithm
        result = FairXORNG.fairXORNG_Evaluate(prob_classes)
        
        # Return updated classes along with the result
        updated_classes = []
        for pc in prob_classes:
            updated_class = {
                'classLabel': pc.classLabel,
                'initialProbability': pc.initialProbability,
                'incrementalBiasRate': pc.incrementalBiasRate,
                'consecutiveFailures': pc.consecutiveFailures,
                'deterministicLimit': pc.deterministicLimit,
                'categoryOutcomes': [
                    {'label': oc.label, 'weight': oc.weight}
                    for oc in pc.categoryOutcomes
                ]
            }
            updated_classes.append(updated_class)
            
        # Parse the result to determine if it was deterministic
        is_deterministic = result.startswith('[Deterministic]')
        if is_deterministic:
            result = result.replace('[Deterministic] ', '')
            
        # Find which class generated the result
        result_class = None
        for cls in updated_classes:
            for outcome in cls['categoryOutcomes']:
                if outcome['label'] == result:
                    result_class = cls['classLabel']
                    break
            if result_class:
                break
                
        return jsonify({
            'result': result,
            'isDeterministic': is_deterministic,
            'classLabel': result_class,
            'updatedClasses': updated_classes
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
