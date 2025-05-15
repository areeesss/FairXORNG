#pragma once
#include <string>
#include <vector>

struct OutcomeCategory {
    std::string label;
    int weight; // Weight for intra-class selection
};

struct ProbabilityClass {
    std::string classLabel;
    double initialProbability;      // Base drop likelihood (%)
    double incrementalBiasRate;     // Bias gain per failure
    int consecutiveFailures = 0;    // Number of failed attempts
    int deterministicLimit;         // Hard threshold for forced success
    std::vector<OutcomeCategory> categoryOutcomes;
};

std::string fairXORNG_Evaluate(std::vector<ProbabilityClass>& classes);