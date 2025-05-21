import torch
from diffusers.utils import load_image
from lbm.inference import evaluate, get_model
from PIL import Image

# load model
model = get_model(
    "jasperai/LBM_relighting",
    torch_dtype=torch.bfloat16,
    device="cuda" if torch.cuda.is_available() else "cpu",
)

# load the source image
def relight_image(input_image: Image.Image, num_sampling_steps: int = 1) -> Image.Image:
    # Perform relighting inference on the input PIL Image
    output_image = evaluate(model, input_image, num_sampling_steps=num_sampling_steps)
    return output_image