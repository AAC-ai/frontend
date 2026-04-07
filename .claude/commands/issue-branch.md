GitHub 이슈 생성 → 브랜치 생성 → PR 작성을 순서대로 진행한다.

## 1. 이슈 생성

```bash
gh issue create \
  --title "<작업 제목>" \
  --body "$(cat <<'EOF'
## 작업 목적
<이 이슈가 해결하는 문제 또는 구현할 기능>

## 구현 범위
- [ ] <세부 작업 1>
- [ ] <세부 작업 2>

## FSD 위치
- 레이어: <app/pages/widgets/features/entities/shared>
- 슬라이스: <슬라이스명>

## 완료 기준
- [ ] /fsd-check 통과
- [ ] /a11y-review 통과 (UI 있을 때)
- [ ] 브라우저 확인
EOF
)"
```

이슈 번호 기록.

## 2. 브랜치 생성

```bash
git checkout main && git pull origin main
git checkout -b feat/#<이슈번호>-<짧은-설명>
```

브랜치 네이밍:
```
feat/#<번호>-<설명>    # 새 기능
fix/#<번호>-<설명>     # 버그 수정
chore/#<번호>-<설명>   # 설정, 의존성
docs/#<번호>-<설명>    # 문서
```

설명은 kebab-case 영어. 예: `feat/#3-word-selector-ui`

## 3. 개발 및 커밋

작업 후 `/commit`으로 한국어 커밋.  
논리적 단위로 커밋 분리.

## 4. PR 생성

```bash
gh pr create \
  --title "<이슈 제목>" \
  --base main \
  --body "$(cat <<'EOF'
## 관련 이슈
closes #<이슈번호>

## 변경 내용
<구현한 내용 요약>

## FSD 구조
- 레이어: <레이어명>
- 슬라이스: <슬라이스명>

## 체크리스트
- [ ] /fsd-check 통과
- [ ] /a11y-review 통과
- [ ] 브라우저 확인

## 스크린샷
<!-- UI 변경 시 첨부 -->
EOF
)"
```

## 주의

- PR 1개 = 이슈 1개
- `closes #<번호>` 본문에 필수 (이슈 자동 닫기)
- main 직접 push 금지
