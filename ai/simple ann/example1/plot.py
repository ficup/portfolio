from matplotlib import pyplot as plt 

f = open("output.txt","r")
f = f.read()
f = f.split('\n')[:-1]
y = []
x = []

for v in f:
    temp = [ float(x) for x in v.split(' ')]
    y.append(temp[0])
    x.append(temp[1])
    
plt.plot(y,x)
plt.show()