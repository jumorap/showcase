# Game Of Life

{{<iframe id="gameoflife" site="https://ycuervob.github.io/gameoflife/" width="600px" height="600px" >}}

## TensorFlow

The code uses TensorFlow, an open-source library for machine learning and neural networks. TensorFlow offers a wide range of tools and functionalities for building and training machine learning models.

In this case, TensorFlow is used to perform the convolution of the Game of Life matrix. Convolution is a mathematical process that combines two functions to produce a third function that represents how one function influences the other. In the context of the Game of Life, convolution is used to apply the rules of the game and determine the state of each cell in the next generation.

The code uses the convolution functionality of TensorFlow to convolve the Game of Life matrix with a specific kernel. The kernel is a three-dimensional matrix that defines the rules of survival and death for the cells in the game. Through convolution, a new matrix is obtained that represents the next generation of the game.

### Detailed Explannation

In two dimensions we can make a convolution like the ones shown in [masking section](/showcase/docs/shortcodes/corte_1/masking/#kernel-convolution), this kind of convolution allow us to alter an image mixing the characteristics of a convolution kernel and the image itsefl. Each operation is made over every pixel of the image making possible to change the value of the pixel according to the values of the pixel in its surroundings, an example of a single operation is shown in the next image.

<div>
<p style="text-align: center;">Figure 1: Kernel convolution</p>
<img id="classigConvolution" src="/showcase/sketches/convolution2d.png" width="auto" height="auto">
</div>

As shown we can create a convolution in which we can count the number of one's surrounding a specific "pixel". the process shown in figure 1 is calculated throw the next operation, basically the process consist in reshape the values of the matrices of shape 3x3 in vectors of shape (9x1) an make dot product with them.

{{< highlight latex >}}
    C_M = (1 x 1) + (0 x 1) + (0 x 1) + (0 x 1) + (1 x 0) + (1 x 1) + (1 x 1) + (0 x 1) + (0 x 1) = 3
{{< /highlight >}}



<img id="classigConvolution" src="/showcase/sketches/convolution3d.png" width="500px" height="500px">

