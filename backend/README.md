# Image Relighting API with LBM (Latent Bridge Matching)

This project provides a FastAPI-based REST API to perform **image relighting** using the `jasperai/LBM_relighting` model from Hugging Face. It takes an input image and generates a relighted version using advanced diffusion-based techniques. The output is returned as a side-by-side comparison of the original and relighted image.

---

## Features

- ✨ High-quality image relighting using latent diffusion.
- ⚡ Fast GPU-accelerated inference with support for `cuda` and `bfloat16`.
- 🖼️ Side-by-side output of input vs relighted image.
- 📈 Logs the processing time for each image.
- 🧪 Simple REST endpoint to test locally or integrate with other apps.

---

## Model Used

- **Model:** [`jasperai/LBM_relighting`](https://huggingface.co/jasperai/LBM_relighting)
- **Method:** Latent Bridge Matching for efficient and controllable image relighting.

---

## Requirements

****CUDA Requirements:****
1. Ensure you have CUDA 12.1 installed, and PATH added to environment variables.
2. To check the version of CUDA installed, run the following in your terminal:
   ``` nvcc --version ```
4. If it is not installed, install [`CUDA 12.1`](https://developer.nvidia.com/cuda-12-1-0-download-archive)


****Install UV:****

  pip:
```bash
pip install uv
```
homebrew: 
```bash
brew install uv
```

****Create Virtual Environment:****

```bash
uv venv .venv
```
To activate on Windows (cmd prompt):
```bash
.venv\Scripts\activate.bat
```
To activate on MacOS:
```bash
source .venv/bin/activate
```

****Install dependencies:****

Install torch 2.5.1 for CUDA 12.1
```bash
uv pip install torch==2.5.1 torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

Other Requirements
```bash
uv pip install -r requirements.txt
```

Install the Relighting Model
```bash
uv pip install git+https://github.com/gojasper/LBM.git
```

****Project Structure:****
```
.
├── app/
│   └── model.py         # Model loading & relight_image() function
│   └── main.py          # FastAPI app with /relight endpoint
├── images/              # demo images to try out the code
├── test.py              # check the torch and cuda compactibility ( Cuda12.1)          
├── .gitignore
├── .python-version      # python v3.11.8
├── pyproject.toml
├── requirements.txt     # required packages
├── uv.lock
└── README.md
```

****How To Use:****
1. Start the fastapi server
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```
2. Open terminal and check your IP Address (required for frontend) \
For Windows: ```ipconfig``` \
On Windows : Go to the Wireless Lan Connection section to copy your IPv4 Address. (ex: 192.168.x.x) \
For MacOS: ```ifconfig``` \
On MacOS : Look for inet in en0 or en1 section and copy the IPv4 Address. (ex: 192.168.x.x)

<br />


****Swagger UI:**** \
To run the fastapi, visit: \
``` http://{YOUR_IP_ADRESS}:8000/docs ``` 



****Example:****
<br />
<pre>Input Image:                                                  Output Image:</pre>
![1316ee27-288a-4370-9c20-c674f6df9f88](https://github.com/user-attachments/assets/4b590a4d-d6d7-4103-8d5f-cb4c39fde7df)
<br />
<pre>Input Image:                                                  Output Image:</pre>
![70ce1e28-6f46-4a00-bf4d-7bec446b1075](https://github.com/user-attachments/assets/35a40c04-13f7-41e1-b1bf-185e10a1782b)
