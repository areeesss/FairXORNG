#include "fairxorng.h"
#include <random>

// Weighted selection within a class
std::string selectWeightedOutcome(const std::vector<OutcomeCategory>& pool) {
    std::random_device rd;
    std::mt19937 rng(rd());
    int totalWeight = 0;
    for (const auto& item : pool) totalWeight += item.weight;

    std::uniform_int_distribution<> dist(1, totalWeight);
    int roll = dist(rng);

    int cumulative = 0;
    for (const auto& item : pool) {
        cumulative += item.weight;
        if (roll <= cumulative) return item.label;
    }
    return "No Selection";
}

// FairXORNG logic
std::string fairXORNG_Evaluate(std::vector<ProbabilityClass>& classes) {
    std::random_device rd;
    std::mt19937 rng(rd());
    std::uniform_real_distribution<> dist(0.0, 100.0);

    for (auto& pClass : classes) {
        // Deterministic override
        if (pClass.consecutiveFailures >= pClass.deterministicLimit) {
            pClass.consecutiveFailures = 0;
            return "[Deterministic] " + selectWeightedOutcome(pClass.categoryOutcomes);
        }

        // Adaptive probability adjustment
        double adjustedProbability = pClass.initialProbability +
                                     (pClass.consecutiveFailures * pClass.incrementalBiasRate);
        if (adjustedProbability > 100.0) adjustedProbability = 100.0;

        double roll = dist(rng);
        if (roll < adjustedProbability) {
            pClass.consecutiveFailures = 0;
            return selectWeightedOutcome(pClass.categoryOutcomes);
        } else {
            pClass.consecutiveFailures++;
        }
    }

    return "No Selection";
}