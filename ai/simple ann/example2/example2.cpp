/*
    Example 2:
        The model learns the sinus function and can then predict value of an argument.
*/

/*
    Classes are related as follows:
        -Network
            -Layer
                -Nodes
                    -Connections
                        -(&)Nodes
*/

// Compilation from source: g++ -o model ./*.cpp ../my_simple_ann/source/*.cpp
// #include "network.h"

// Compilation with installed library: g++ -o model ./*.cpp -lmysimpleann
#include <my_simple_ann/network.h>

#include <vector>
#include <fstream>
#include <string>
#include <cmath>

void loadAndPrepareData( std::vector<TrainData>* train_data, const char* file_name, int input_size  ){
    std::ifstream input_file( file_name );    
    while( input_file.good() ){
        TrainData temp_td;
        std::string temp_string;
        input_file>>temp_string;
        temp_td.x_train.push_back( atof( temp_string.c_str() ));
        input_file>>temp_string;
        temp_td.y_train.push_back( atof(temp_string.c_str() ) );

        train_data->push_back(temp_td);
    }
}

int main(int argc, char** argv){
    Network model;

    model.addLayer(1, "input", true, "linear");
    model.addLayer(4, "hidden", true, "tanh");
    model.addLayer(1, "output", true, "linear");
    model.connectAllLayers();
    
    model.summary();

    std::vector<TrainData> train_data;
    loadAndPrepareData(&train_data, "input.txt", 1);

    int n_epochs = 10000;
    model.train( train_data, n_epochs );

    const float PI = 3.1416;
    std::cout<<"sin(0) = "<<model.evaluate(0.0)<<std::endl;
    std::cout<<"sin(PI/4) = "<<model.evaluate(PI/4)<<std::endl;
    std::cout<<"sin(PI/2) = "<<model.evaluate(PI/2)<<std::endl;
    std::cout<<"sin(PI) = "<<model.evaluate(PI)<<std::endl;
    std::cout<<"sin(3*PI/2) = "<<model.evaluate(3*PI/2)<<std::endl;
    std::cout<<"sin(2*PI) = "<<model.evaluate(2*PI)<<std::endl;
    std::cout<<"sin(3*PI) = "<<model.evaluate(3*PI)<<std::endl;
    std::cout<<"sin(4*PI) = "<<model.evaluate(4*PI)<<std::endl;

    // dumping values
    std::ofstream output("output.txt");
    for(float x=-3*PI; x<=3*PI; x+=0.01){
        output<<x<<" "<<model.evaluate(x)<<std::endl;
    }

    return 0;
}
