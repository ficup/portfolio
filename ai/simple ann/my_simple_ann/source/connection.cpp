#include "node.h"
#include "connection.h"
#include <time.h>
#include <cstdlib>

#include <cstdio>
#include <unistd.h>

Connection::Connection(Node* from_node, Node* to_node){ // random weights
    this->from_node = from_node;
    this->to_node = to_node;
    srand(time(NULL)+rand());
    this->weight = (float)(rand()%2000)/1000 - 1.0; 
    srand(time(NULL)+rand());
    this->bias = (float)(rand()%2000)/1000 - 1.0; 
    // this->bias = 0.0; 
}

Connection::Connection(Node* from_node, Node* to_node, float weight, float offset){
    this->from_node = from_node;
    this->to_node = to_node;
    this->weight = weight;
    this->bias = offset;
}

void Connection::updateWeightAndBias(){
    this->weight += LEARNING_RATE * (this->to_node->error) * (this->from_node->value);
    if( this->weight > WEIGHT_UPPER_LIMIT )
        this->weight = WEIGHT_UPPER_LIMIT;
    else if(this->weight < WEIGHT_LOWER_LIMIT)
        this->weight = WEIGHT_LOWER_LIMIT;

    this->bias += LEARNING_RATE * (this->to_node->error);
    if( this->bias > BIAS_UPPER_LIMIT )
        this->bias = BIAS_UPPER_LIMIT;
    else if(this->bias<= BIAS_LOWER_LIMIT)
        this->bias = BIAS_LOWER_LIMIT;
}