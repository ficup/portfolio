#include <vector>

class Connection;
class Node{
public:
    std::vector<Connection> connections;
    int n_connections;
    float state;
    float error;
    float value;
    char activation_type[16];
    float (*activation)(float x);
    float (*activation_dt)(float x);

    Node();
    Node(float initial_state, const char activation_type[]);

    void addConnection(Node* from_node);

    void updateState();
    void updateValue();

    void updateError();
    void backpropagateError();
    void updateConnectionWeights();
};