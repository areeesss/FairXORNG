#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include "fairxorng.h"

namespace py = pybind11;

PYBIND11_MODULE(FairXORNG, m) {
    py::class_<OutcomeCategory>(m, "OutcomeCategory")
        .def(py::init<>())
        .def_readwrite("label", &OutcomeCategory::label)
        .def_readwrite("weight", &OutcomeCategory::weight);

    py::class_<ProbabilityClass>(m, "ProbabilityClass")
        .def(py::init<>())
        .def_readwrite("classLabel", &ProbabilityClass::classLabel)
        .def_readwrite("initialProbability", &ProbabilityClass::initialProbability)
        .def_readwrite("incrementalBiasRate", &ProbabilityClass::incrementalBiasRate)
        .def_readwrite("consecutiveFailures", &ProbabilityClass::consecutiveFailures)
        .def_readwrite("deterministicLimit", &ProbabilityClass::deterministicLimit)
        .def_readwrite("categoryOutcomes", &ProbabilityClass::categoryOutcomes);

    m.def("fairXORNG_Evaluate", &fairXORNG_Evaluate, "Run the FairXORNG drop logic");
}