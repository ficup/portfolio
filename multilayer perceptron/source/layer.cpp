// perceptron classes
#include "layer.h"
#include "node.h"

// other classes
#include <time.h>
#include <cstdlib>
#include <string.h>

#include "stdio.h"

Layer::Layer(int n_nodes, const char label[], bool initialStatesAreRandom, const char activation_type[]){
    this->n_nodes = n_nodes;
    strcpy(this->label, label);
    if(initialStatesAreRandom){ 
        srand(time(0));
        this->nodes = new Node*[n_nodes];
        for(int i=0; i<this->n_nodes; i++){
            float initial_state = 1/(float)(rand()%1000);
            this->nodes[i] = new Node(initial_state, activation_type); 
        }
    }
    else{
        this->nodes = new Node*[n_nodes];
        for(int i=0; i<this->n_nodes; i++)
            this->nodes[i] = new Node(0.0, activation_type);
    }
        
}

Layer::~Layer(){}

// Łączenie każdy z każdym
void Layer::connectNodes( Layer* from_layer ){
    for(int i=0; i<this->n_nodes; i++)
    for(int j=0; j<from_layer->n_nodes; j++){
        this->nodes[i]->addConnection( from_layer->nodes[j] );
    }
};

void Layer::updateNodes(){
    for(int i=0; i<this->n_nodes; i++){
        this->nodes[i]->updateState();
        this->nodes[i]->updateValue();
    };
};

void Layer::backpropagateErrors(){
    for(int i=0; i<this->n_nodes; i++){
        this->nodes[i]->updateError();
        this->nodes[i]->backpropagateError();
        this->nodes[i]->updateConnectionWeights();
    };
};