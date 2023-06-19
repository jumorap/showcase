# Game Of Life

{{<iframe id="gameoflife" site="https://ycuervob.github.io/gameoflife/" width="600px" height="600px" >}}

## TensorFlow

The code uses TensorFlow, an open-source library for machine learning and neural networks. TensorFlow offers a wide range of tools and functionalities for building and training machine learning models.

In this case, TensorFlow is used to perform the convolution of the Game of Life matrix. Convolution is a mathematical process that combines two functions to produce a third function that represents how one function influences the other. In the context of the Game of Life, convolution is used to apply the rules of the game and determine the state of each cell in the next generation.

The code uses the convolution functionality of TensorFlow to convolve the Game of Life matrix with a specific kernel. The kernel is a three-dimensional matrix that defines the rules of survival and death for the cells in the game. Through convolution, a new matrix is obtained that represents the next generation of the game.

### Little Explannation

In two dimensions we can make a convolution like the ones shown in [masking section](/showcase/docs/shortcodes/corte_1/masking/#kernel-convolution), this kind of convolution allow us to alter an image mixing the characteristics of a convolution kernel and the image itsefl. Each operation is made over every pixel of the image making possible to change the value of the pixel according to the values of the pixel in its surroundings, an example of a single operation is shown in the next image.

<div>
<p style="text-align: center;">Figure 1: Kernel convolution</p>
<img id="classigConvolution" src="/showcase/sketches/convolution2d.png" width="auto" height="auto">
</div>

We can create a convolution in which we can count the number of one's surrounding a specific "pixel". the process shown in figure 1 is calculated throw a simple operation, basically the process consist of reshaping the values of the matrices of shape 3x3 in vectors of shape 9x1 an operate them with dot product.

{{< katex display >}}
    C_M = (1 \times 1) + (0 \times 1) + (0 \times 1) + (0 \times 1) + (1 \times 0) + (1 \times 1) + (1 \times 1) + (0 \times 1) + (0 \times 1) = 3
{{< /katex >}}

Similarly, we can extrapolate this operation in two dimensions in three dimensions as well, imagine a kernel matrix not of shape 3x3 but one of shape 3x3x3 such as the one in the Figure 2 which has ones in every postion exept for the center.

<div>
<p style="text-align: center;">Figure 2: Kernel convolution 3 dimensions</p>
<img style="display: block;margin-left: auto; margin-right: auto;width: 50%;" id="classigConvolution" src="/showcase/sketches/convolution3d.png" width="500px" height="500px">
</div>

Therefore, we can use a matrix of such characteristics to perform a similar operation like the one made in Figure 1, as shown in Figure 3.

<div>
<p style="text-align: center;">Figure 3: Convolution 3 dimensions</p>
<img  id="classigConvolution" src="/showcase/sketches/convolution3dcomplete.png" width="auto" height="auto">
</div>
