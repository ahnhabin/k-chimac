# K-ChiMac 히어로 영상 만들기 (Google 무료 도구)

맛 3개(후라이드 / 양념 / 간장마늘)에 대해 아래 1~3단계를 한 번씩 반복합니다.
결과물은 맛마다 mp4 1개, 총 3개입니다.

## 준비물

맛별 실제 치킨 사진 1장씩 (친구분께 요청). 접시째로 위에서 비스듬히 찍은 사진이면 충분합니다.
사진이 아직 없으면 각 프롬프트의 "Using the uploaded photo" 문장을 빼고 글로만 생성해 테스트할 수 있습니다.

## 맛별로 바꿔 넣을 부분

| 맛 | [CHICKEN] | [INGREDIENTS] | [SPLASH] |
|---|---|---|---|
| 후라이드 | golden crispy Korean fried chicken, no sauce | crispy batter crumbs, coarse sea salt flakes, black pepper | a fine burst of golden crumbs and salt (no liquid) |
| 양념 | Korean fried chicken coated in glossy red yangnyeom sauce | toasted sesame seeds, crushed peanuts, red chili flakes | a splash of glossy red sweet-chili sauce |
| 간장마늘 | Korean fried chicken coated in dark glossy soy garlic glaze | sliced garlic chips, toasted sesame seeds, thin green onion slivers | a splash of dark amber soy glaze |

## 1단계. 시작 프레임 (Whisk 또는 Gemini 앱의 이미지 생성)

치킨 사진을 올리고 붙여넣습니다. 가로 16:9로 생성합니다.

```
Using the uploaded photo as the exact reference for the food, create a clean hero product shot.
A generous pile of [CHICKEN] stacked on a small matte black plate, centered in the frame,
viewed from a slightly elevated front angle.
STYLE: commercial food photography, soft studio key light from the upper left, crisp texture detail,
appetizing warm highlights, no steam, no hands, no text, no logo.
BACKGROUND: pure solid black (#000000), no gradients, no reflections, no table surface visible.
COMPOSITION: the food fills about 40% of the frame with empty black space all around it.
Aspect ratio 16:9. Keep the food looking exactly like the uploaded photo.
```

## 2단계. 끝 프레임 (같은 도구, 1단계 결과 이미지를 올리고)

```
Using the uploaded image, generate the final frame of a food animation.
Keep the same pile of [CHICKEN] in the same position and size, but lift a few pieces so they float
just above the pile, tilted at dynamic angles.
INGREDIENT BURST:
- Surround the chicken with [INGREDIENTS] exploding outward in all directions
- Add [SPLASH] arcing behind and partially around the chicken
- Everything looks frozen by high-speed photography: sharp, crisp, mid-air, no motion blur
STYLE: same soft studio lighting as the uploaded image, energetic key-visual composition.
BACKGROUND: pure solid black (#000000), no gradients, fog or shadows.
Aspect ratio 16:9. Preserve the exact colors and look of the chicken in the uploaded image.
```

## 3단계. 영상 (Google Flow, "Frames to Video" 모드)

시작 프레임과 끝 프레임을 각각 올리고 붙여넣습니다.

```
Create a smooth transition from the first frame to the final ingredient-burst frame.
Begin with the [CHICKEN] resting still on a pure black background. A few pieces slowly lift and rotate
as [INGREDIENTS] gradually enter from behind and around the food, increasing in number until the full burst.
[SPLASH] emerges from behind the food near the end and wraps partially around it.
Slow-motion, high-speed commercial look. Sharp details, no motion blur.
Camera locked off, no zoom, no pan. Background stays pure black for the whole clip.
No text, no hands, no extra objects.
```

두 가지 결과가 나오면 배경이 끝까지 검정이고 치킨 모양이 덜 변하는 쪽을 고릅니다.

## 4단계. 저장

mp4를 아래 이름으로 저장하면 됩니다. 프레임 분해와 사이트 연결은 그 다음에 처리합니다.

```
C:\project\k-chimac\video\fried.mp4
C:\project\k-chimac\video\yangnyeom.mp4
C:\project\k-chimac\video\soygarlic.mp4
```
