import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"

# def text_extr():
#     img = cv2.imread("./image.png")
#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#     noise=cv2.medianBlur(gray,3)
#     thresh = cv2.threshold(noise, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
#     config = ("-l eng — oem 3 — psm 3")
#     text = pytesseract.image_to_string(thresh,config=config)
#     return text

# print(text_extr())

img = cv2.imread("./image.png")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
noise=cv2.medianBlur(gray,3)
thresh = cv2.threshold(noise, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
config = ("-l eng — oem 3 — psm 3")
text = pytesseract.image_to_string(thresh,config=config)
print(text)
