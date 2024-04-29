#include "network.h"
#include "node.h"

#include "stdio.h"

Network::Network(){};

void Network::addLayer(int n_nodes, const char label[], bool initialStatesAreRandom, const char activation_type[]){
    Layer temp(n_nodes, label, initialStatesAreRandom, activation_type);
    this->layers.push_back(temp);
};

void Network::summary(){
    puts("Model summary:");
    for(int i=0; i<this->layers.size(); i++)
        printf("%s(%d):\nNumber of nodes: %d\tActivation: %s\n", 
            this->layers[i].label, i, this->layers[i].n_nodes, this->layers[i].nodes[0]->activation_type);
};

void Network::connectLayers(int from_idx, int to_idx){
    this->layers[to_idx].connectNodes( &this->layers[from_idx] );
};

void Network::connectAllLayers(){
    for(int i=0; i<this->layers.size()-1; i++){
        this->connectLayers(i, i+1);
    }
};

/*
    Dane wejściowe są traktowane jako stany pierwszej warstwy.
    Przy ustawieniu funkcji aktywacji na "linear", wartości
    pierwszej warstwy są takie same jak jej stany.
*/
// TODO - przerobić na bardziej uniwersalną wersję
void Network::forward(float input){
    this->layers[0].nodes[0]->value = input; // TODO - zrobić to trochę ładniej (moża warstwa Input?)
    this->layers[0].nodes[0]->error = 0.0;
    for( int i=1; i<this->layers.size(); i++ ){
        this->layers[i].updateNodes();
    }
};

void Network::forward(std::vector<float> input){
    for(int i=0; i<this->layers[0].n_nodes; i++){ // TODO - zrobić to trochę ładniej (moża warstwa Input?)
        this->layers[0].nodes[i]->state = input[i]; 
        this->layers[0].nodes[i]->updateValue(); 
        this->layers[0].nodes[i]->error = 0.0;
    }
    for( int i=1; i<this->layers.size(); i++ ){
        this->layers[i].updateNodes();
    }
};

void Network::backward(float expected_value){
    Node* output_node = this->layers[ this->layers.size() - 1 ].nodes[0];;
    output_node->error = expected_value - output_node->value;
    for( int i=this->layers.size() - 1; i>=1; i-- ){
        this->layers[i].backpropagateErrors();
    }
}

void Network::backward(std::vector<float> expected_value){
    for(int i=0; i<this->layers[ this->layers.size() - 1 ].n_nodes; i++){
        Node* output_node = this->layers[ this->layers.size() - 1 ].nodes[i];;
        output_node->error = expected_value[i] - output_node->value;
    }
    for( int i=this->layers.size() - 1; i>=1; i-- ){
        this->layers[i].backpropagateErrors();
    }
}

float Network::evaluate( std::vector<float> input ){
    this->forward(input);
    return this->layers[ this->layers.size() - 1 ].nodes[0]->value;
}

float Network::evaluate( float input ){
    this->forward(input);
    return this->layers[ this->layers.size() - 1 ].nodes[0]->value;
}

void Network::train(std::vector<TrainData> train_data, int n_epochs){
    for(int i=0; i<n_epochs; i++)
    for(int j=0; j<train_data.size(); j++){
        this->forward( train_data[j].x_train );
        this->backward( train_data[j].y_train );
    }
}