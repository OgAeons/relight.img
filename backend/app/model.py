import torch
from diffusers.utils import load_image
from lbm.inference import evaluate, get_model
from PIL import Image

# load model
model = get_model(
    "jasperai/LBM_relighting",
    torch_dtype=torch.bfloat16,
    device="cuda",
)

# print("Model loaded on device:", next(model.parameters()).device)

# load the source image
def relight_image(input_image: Image.Image, num_sampling_steps: int = 1) -> Image.Image:
    # Perform inference
    output_image = evaluate(model, input_image, num_sampling_steps=num_sampling_steps)

    # Resize output image to match original input
    output_image = output_image.resize(input_image.size)

    return output_image

    # # Combine both images side by side
    # combined_width = input_image.width * 2
    # combined_image = Image.new("RGB", (combined_width, input_image.height))
    # combined_image.paste(input_image, (0, 0))
    # combined_image.paste(output_image, (input_image.width, 0))

    # return combined_image