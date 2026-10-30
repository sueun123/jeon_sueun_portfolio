# Figma에서 실제 사용된 원본 래스터 이미지

- 소스: `Portfolio Website — IA & Wireframe.fig`
- 포함: 표시 중인 디자인 노드가 참조하는 고유 이미지 47개 (Mat Cha 18개, TEA TEA 29개)
- 제외: 파일에 저장된 미사용 이미지, 숨긴 노드/이미지 채우기, 중복 참조, Figma 썸네일
- 각 파일은 `.fig` 내부 `images/` 항목의 바이트를 **그대로 복사**했습니다. 크롭, 리사이즈, 재압축, Figma 필터, 색 보정, 혼합 모드 및 위에 얹힌 Figma 레이어는 적용하지 않았습니다.
- `manifest.csv`에는 원본 해시, 크기, Figma 노드와 보드 번호, 필터 및 레이어 사용 여부가 있습니다. 동일 바이트 및 동일 픽셀 이미지는 중복되지 않았습니다.

## Figma에서만 적용된 효과

다음 이미지는 디자인에서 별도 색 보정 필터가 적용되어 있지만, 이 폴더에는 **필터 적용 전 저장 이미지**가 들어 있습니다.

- `01_Mat_Cha/02_matcha_leaf_texture.jpg`: 노출, 하이라이트, 색조, 채도, 대비 조정
- `01_Mat_Cha/03_matcha_powder_texture.jpg`: 노출, 하이라이트, 색온도, 채도, 대비 조정
- `01_Mat_Cha/05_cafe_interior.png`: 노출, 하이라이트, 채도, 대비 조정

TEA TEA 일부 노드에는 Figma의 단색/그라디언트 오버레이, 혼합 모드 또는 배경 흐림이 있습니다. 추출 이미지에는 이런 Figma 레이어 효과가 포함되지 않습니다.

## 이미지 자체에 포함된 편집

몇몇 원본 래스터는 포스터, 웹/모바일 화면, 텍스트·로고가 합쳐진 완성 이미지입니다. 예: `01_Mat_Cha/15_product_poster.png`, `01_Mat_Cha/17_website_layout.png`, `02_TEA_TEA/06_website_hero_mockup.png`, `02_TEA_TEA/27_jar_bedroom_with_text.png`. 해당 텍스트·그래픽·색감이 이미지 파일 자체에 이미 구워져 있다면, `.fig`만으로는 그 이전의 무보정 사진을 정확히 복원할 수 없습니다. 이 파일들은 Figma에 저장된 가장 원본에 가까운 바이트입니다.
