/*
    Classes are related as follows:
        -Network
            -Layer
                -Nodes
                    -Connections
                        -(&)Nodes
*/

// Compilation: g++ -o model ./*.cpp ../source/*.cpp

#include "../source/network.h"
#include "../source/node.h"

#include <vector>
#include <fstream>
#include <string>

void loadData( std::vector<TrainData>* train_data, const char* file_name  ){
    std::ifstream input_file( file_name );    
    while( input_file.good() ){
        TrainData temp_td;
        std::string temp_string;
        input_file>>temp_string;
        temp_td.x_train.push_back( atof( temp_string.c_str() ) );
        input_file>>temp_string;
        temp_td.y_train.push_back( atof(temp_string.c_str() ) );
        train_data->push_back(temp_td);
    }
}

int main(int argc, char** argv){
    Network model;

    model.addLayer(1, "input", true, "linear");
    model.addLayer(1, "output", true, "tanh");
    model.connectAllLayers();

    model.summary();

    std::vector<TrainData> train_data;
    loadData(&train_data, "input.txt");

    int n_epochs = 100000;
    model.train( train_data, n_epochs );

    std::cout<<"f( -5.0 )\t"<<model.evaluate(-5.0)<<std::endl;
    std::cout<<"f( 1.0 )\t"<<model.evaluate(1.0)<<std::endl;
    std::cout<<"f( 4.0 )\t"<<model.evaluate(4.0)<<std::endl;
    std::cout<<"f( 4.5 )\t"<<model.evaluate(4.5)<<std::endl;
    std::cout<<"f( 4.9 )\t"<<model.evaluate(4.9)<<std::endl;
    std::cout<<"f( 5.0 )\t"<<model.evaluate(5.0)<<std::endl;
    std::cout<<"f( 5.1 )\t"<<model.evaluate(5.1)<<std::endl;
    std::cout<<"f( 6.9 )\t"<<model.evaluate(6.9 )<<std::endl;
    std::cout<<"f( 16 )\t"<<model.evaluate(16)<<std::endl;

    // dumping values
    std::ofstream output("output.txt");
    for(float x=-3; x<=8; x+=0.01){
        output<<x<<" "<<model.evaluate(x)<<std::endl;
    }

    return 0;
}
