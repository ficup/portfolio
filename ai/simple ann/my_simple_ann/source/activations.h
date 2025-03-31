#ifndef my_simple_ann_activations
#define my_simple_ann_activations

#include "math.h"

namespace Activation{

    static float step(float x){
    return x >=0 ? 1 : 0;
    }

    static float relu(float x){
        return x >= 0 ? x : 0;
    }

    static float linear(float x){
        return x;
    }

    static float sigmoid(float x){
        return 1 / ( 1 + exp(-x) );
    }

    static float tanh(float x){
        return (exp(x) - exp(-x)) / (exp(x) + exp(-x));
    }

    static float step_dt(float x){ 
    return x  == 0.0 ? 1 : 0; // TODO
    }

    static float relu_dt(float x){
        return x >= 0 ? 1 : 0;
    }

    static float linear_dt(float x){
        return 1;
    }

    static float sigmoid_dt(float x){
        return exp(-x) / pow( ( exp(-x) + 1 ), 2);
    }

    static float tanh_dt(float x){
        return 4 / pow(( exp(-x) + exp(x) ), 2);
    }
}

#endif