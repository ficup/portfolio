#include "connection.h"
#include "activations.h"
#include "node.h"

#include <string.h>
#include <stdio.h>

Node::Node(){
    this->state = 0.0;
    this->error = 0.0;
    this->value = 0.0;
    this->activation = NULL;
    this->activation_dt = NULL;
    this->n_connections = 0;
}

Node::Node(float initial_state, const char activation_type[]){
    this->state = initial_state;
    this->value = 0.0;
    this->error = 0.0;
    this->n_connections = 0;
    if(strcmp(activation_type, "step")==0){
        this->activation = Activation::step;
        this->activation_dt = Activation::step_dt;
    }
    else if(strcmp(activation_type, "relu")==0){
        this->activation = Activation::relu;
        this->activation_dt = Activation::relu_dt;
    }
    else if(strcmp(activation_type, "linear")==0){
        this->activation = Activation::linear;
        this->activation_dt = Activation::linear_dt;
    }
    else if(strcmp(activation_type, "sigmoid")==0){
        this->activation = Activation::sigmoid;
        this->activation_dt = Activation::sigmoid_dt;
    }
    else if(strcmp(activation_type, "tanh")==0){
        this->activation = Activation::tanh;
        this->activation_dt = Activation::tanh_dt;
    }
    else{
        printf("ERROR: %s - no such activation function\n", activation_type);
        exit(-1);
    }
    strcpy(this->activation_type, activation_type);
}

void Node::addConnection(Node* from_node){
    this->connections.push_back( Connection(from_node, this) );
    this->n_connections++;
}

void Node::updateState(){
    float result = 0.0;
    for(int i=0; i<this->connections.size(); i++){
        result +=  this->connections[i].from_node->value * this->connections[i].weight ;
        result += this->connections[i].bias;
    }
    this->state = result;
    this->error = 0.0;
};

void Node::updateValue(){
    this->value = this->activation(this->state);
}

void Node::updateError(){ 
    this->error *= this->activation_dt( this->state );
}

void Node::backpropagateError(){
    for(int i=0; i<this->connections.size(); i++){
        this->connections[i].from_node->error += this->error * this->connections[i].weight;
    }
}

void Node::updateConnectionWeights(){
    for(int i=0; i<this->connections.size(); i++){
        this->connections[i].updateWeightAndBias();
    }
}