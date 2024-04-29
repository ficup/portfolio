class Node;
class Layer{
public:
    Node** nodes;
    int n_nodes;
    char label[32];

public:
    Layer();
    Layer(int n_nodes, const char label[], bool initialStatesAreRandom, const char activation_type[]);
    ~Layer();

    void connectNodes( Layer* from_layer );
    void updateNodes();
    void backpropagateErrors();
};