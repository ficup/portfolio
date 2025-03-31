/*
    This is the outermost class that consist of one or more layers
*/

#ifndef my_simple_ann_network
#define my_simple_ann_network

#include "layer.h"
#include "connection.h"
#include "node.h"

#include <vector>
#include <iostream>

typedef struct{
    std::vector<float> x_train;
    std::vector<float> y_train;
}TrainData;

// typedef typename
class Network{
    public:

    std::vector<Layer> layers;

    Network();
    void addLayer(int n_nodes, const char label[], bool initialStatesAreRandom, const char activation_type[]);
    void insertLayer(int idx, int n_nodes, bool initialStatesAreRandom, const char activation_type[]); // TODO
    void removeLayer(int idx); // TODO
    void connectLayers( int from_idx, int to_idx );
    void connectAllLayers(); // łączy wszystkie wartswy sekwencyjnie, w kolejności indeksacji

    void forward(float input);
    void forward(std::vector<float> input);
    float evaluate(float input);
    float evaluate(std::vector<float> input);

    void backward(float expected_value); // aktualizuj wagi 1 raz na podstawie oczekiwanej wartości i obecnych stanów
    void backward(std::vector<float> expected_value); // aktualizuj wagi 1 raz na podstawie oczekiwanej wartości i obecnych stanów

    void train(std::vector<TrainData> train_data, int n_epochs);

    void summary(); // prints the architecture
};

#endif
