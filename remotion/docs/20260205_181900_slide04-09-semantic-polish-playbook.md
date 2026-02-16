# Slide04-09 Semantic Polish 実行手順書

**作成日:** 2026-02-05  
**対象:** `Slide04SolutionV2` 〜 `Slide09EpilogueV2`  
**目的:** Slide03 で適用した「意味優先Polish（装飾→意味の逆転）」を、残りスライドへ同じ品質で展開する。

---

## 1. 先に固定する方針（必須）

1. 1スライド1メッセージを先に文章化する。  
2. アイコンは装飾でなく「ラベル付き意味単位」で使う。  
3. 数値は必ず定義（単位・期間・閾値）を同画面に置く。  
4. `copy.ts` は変更しない。  
5. フレーム0 still-safe を維持する（Remotion静止画前提）。

---

## 2. 共通の実装パターン（Slide03で有効だった型）

### 2.1 意味ユニット化

- 悪い例: アイコンだけを横並びで置く。  
- 良い例: `icon + label` の信号行（Signal Row）として置く。  

実装ルール:

1. 行の最小構成は `SlideIcon(variant="simple") + 16px文字ラベル`。  
2. 1行1概念。1カードあたり2〜3行まで。  
3. 行の背景は薄いガラス、枠線は `rgba(255,255,255,0.18)` 付近。  

### 2.2 読む順番を固定

カード内は必ず以下順序:

1. ヒーローアイコン  
2. タイトル  
3. エビデンス文（1文）  
4. シグナル行またはチャート  

### 2.3 新規アイコン投入基準

既存アイコンが以下を満たさない場合は新規作成:

1. 初見で意味が推測できない。  
2. ラベルがないと別概念に誤読される。  
3. 既存セット内にドメイン対応の代替がない。  

配置先:

- `remotion/public/assets/svg/icons/icon-*.svg`

---

## 3. スライド別 実行手順

## 3.1 Slide04（Unified AI Backbone）

**メッセージ:** 「4エンジンは役割分担され、監査可能な実行系として統合されている。」

手順:

1. 4カード均等グリッドを維持し、重なりを禁止。  
2. 各カードに「能力の証拠」1つだけ残す。  
3. Governカードの3シグナルをラベル固定する。  
4. チャート要素には短い凡例を直下に配置する。  
5. `capability` 文は最大2行に制限する。  

重点チェック:

1. Protect/Grow/Execute/Govern が同じ視覚重みか。  
2. 「飾りアイコン」に見える要素が残っていないか。  

## 3.2 Slide05（Differentiation）

**メッセージ:** 「差分は“機能数”ではなく“実行可能性と統治性”である。」

手順:

1. Radarは軸ラベルの可読性を優先する。  
2. Unique項目は `icon + label + one-line proof` に統一する。  
3. 用語が抽象的な行は具体語に寄せる（例: Governance First → Audit-Ready Governance）。  
4. 行間を詰めすぎず、視線の縦読みを優先する。  

重点チェック:

1. Traditional と Poseidon の比較観点が同一粒度か。  
2. Unique行だけが確実に3秒で判別できるか。  

## 3.3 Slide06（Roadmap & Governance）

**メッセージ:** 「ロードマップは美しい図ではなく、検証可能なKPI契約である。」

手順:

1. 各PhaseにKPI定義文を必ず置く。  
2. ChartBarの下ラベルと注記の重なりを避ける余白を固定する。  
3. Users/Precision/Uptime など指標名を省略せず表示する。  
4. `≥` `≤` の閾値は注記文と同じ意味になるよう整合させる。  
5. Pillarバッジは飾りでなく分類ラベルとして維持する。  

重点チェック:

1. 「何を達成したら次Phaseへ進むか」が読めるか。  
2. 数字の母集団・期間が欠けていないか。  

## 3.4 Slide07（Demo）

**メッセージ:** 「デモは見栄えでなく、意思決定フロー（検知→予測→承認→監査）を証明する。」

手順:

1. 4フレームの各カードに `入力 / 処理 / 出力` を最小1行で明示する。  
2. KPIバッジだけでなく「意味ラベル」を追加する。  
3. 矢印は遷移順序の補助に限定し、説明はテキストで担保する。  
4. 1カード内のテキストは3ブロックまでに制限する。  

重点チェック:

1. Step間の違いが一目で説明できるか。  
2. デモを見ていなくても画面だけで流れを追えるか。  

## 3.5 Slide08（Summary）

**メッセージ:** 「3本柱（Governance / Assistant / Business）が同じ戦略に収束する。」

手順:

1. Vision文を短文化し、太字ハイライトは1フレーズだけにする。  
2. 各柱を `役割名 + 2-3シグナル` に統一する。  
3. Businessチャートの各バーに意味ラベルを併記する。  
4. 柱間の比較可能性を保つため、カード構造を揃える。  

重点チェック:

1. 3柱が同列に比較できるか。  
2. Summaryで新概念を増やしていないか。  

## 3.6 Slide09（Epilogue）

**メッセージ:** 「結論と次アクション（CTA）を明確に閉じる。」

手順:

1. 感情コピーとCTAの視覚階層を分離する。  
2. QR領域に「何を得られるか」を1行で追加する。  
3. Team行は過剰に主張せず、証拠の補助として配置する。  
4. 背景エフェクトはCTA可読性を下げない範囲に抑える。  

重点チェック:

1. 最後に何をしてほしいかが明確か。  
2. クロージングが情緒だけで終わっていないか。  

---

## 4. 実行順序（推奨）

1. Slide04  
2. Slide06  
3. Slide07  
4. Slide05  
5. Slide08  
6. Slide09  

理由:

1. 先に構造スライド（04/06/07）を固めると、後半の比較・要約・締めがぶれない。  
2. KPI定義を先に確定すると、Slide08/09 の文言統合が容易になる。  

---

## 5. ファイル編集ガイド

主編集:

- `remotion/src/v2/Slide04SolutionV2.tsx`
- `remotion/src/v2/Slide05DifferentiationV2.tsx`
- `remotion/src/v2/Slide06BusinessV2.tsx`
- `remotion/src/v2/Slide07DemoV2.tsx`
- `remotion/src/v2/Slide08SummaryV2.tsx`
- `remotion/src/v2/Slide09EpilogueV2.tsx`
- `remotion/src/shared/slideLayouts.ts`

必要時:

- `remotion/public/assets/svg/icons/icon-*.svg`

---

## 6. 検証手順（毎サイクル）

```bash
cd /Users/shinjifujiwara/code/poseidon.ai/remotion
npx tsc --noEmit
npx eslint src/
```

個別レンダリング:

```bash
cd /Users/shinjifujiwara/code/poseidon.ai/remotion
for comp in Slide04SolutionV2 Slide05DifferentiationV2 Slide06BusinessV2 Slide07DemoV2 Slide08SummaryV2 Slide09EpilogueV2; do
  npx remotion still "$comp" "out/v2-$comp.png" --scale=2
done
```

PPTX再生成:

```bash
node /Users/shinjifujiwara/code/poseidon.ai/remotion/scripts/gen-v2-pptx.js
```

---

## 7. Definition of Done（完了条件）

1. 各スライドで「この1枚の主張」を10秒で説明できる。  
2. 装飾アイコンのみの塊が存在しない。  
3. KPIは定義文付きで誤解なく読める。  
4. テキスト・チャート・注記が重ならない。  
5. `tsc` / `eslint` / still render / pptx生成がすべて成功する。  

---

## 8. 実装メモ（運用）

1. 1回の変更は2スライド以内に分割し、毎回レンダリング確認する。  
2. アイコンを増やす際は「用途が3回以上出るか」で採用判定する。  
3. 新規アイコン名は意味ベースで命名する（例: `icon-consent-rail.svg`）。  

---

## 9. Narrative 全体設計（Slide04-09）

### 9.1 ストーリーライン

1. **Slide04 (Architecture):** 「Poseidonは4エンジンで分業された実行可能AIである。」  
2. **Slide05 (Differentiation):** 「差分は“見える化”ではなく“実行と統治”にある。」  
3. **Slide06 (Roadmap):** 「この戦略はKPI契約として段階実装できる。」  
4. **Slide07 (Demo Proof):** 「実際の利用フローは検知→予測→承認→監査で閉じる。」  
5. **Slide08 (Synthesis):** 「3本柱が単一の価値仮説に収束する。」  
6. **Slide09 (Close):** 「次の行動（QR/デモ接続）に即時遷移できる。」

### 9.2 各遷移で伝えるべき接続詞

1. 04→05: **“So what makes this different?”**  
2. 05→06: **“Can this be executed credibly?”**  
3. 06→07: **“What does it look like in use?”**  
4. 07→08: **“What is the strategic takeaway?”**  
5. 08→09: **“What should we do next?”**

---

## 10. Slide別 Narrative 詳細仕様

## 10.1 Slide04 Unified AI Backbone

**審査側の問い:** 「アーキテクチャは論理的に分業されているか？」  
**主張:** 4エンジンは責務が衝突せず、Governで監査可能に閉じる。  
**必要証拠:** Engineごとの `proof line + signal rows + key metric`。

推奨ナレーション（30秒以内）:

1. Protectは異常検知と遮断。  
2. Growは予測と説明。  
3. Executeは人間承認付きの実行。  
4. Governは全意思決定を監査可能に固定する。  
5. 4つが連携して「AI実行系」が成立する。

避けるべき表現:

1. 抽象語だけの箇条書き。  
2. アイコンだけで意味を推測させる構成。  
3. 1カード内で複数主張を競合させる構成。

## 10.2 Slide05 Beyond Aggregation

**審査側の問い:** 「本当に差別化されているのか？」  
**主張:** Poseidonは集約の先（予測・承認・統治）まで一体化している。  
**必要証拠:** 比較軸を同粒度で並べ、Unique行に根拠を添える。

推奨ナレーション:

1. 従来は可視化中心。  
2. Poseidonは推論→意思決定→承認→監査まで通す。  
3. 差分は機能数でなく「行動に落ちるか」で評価すべき。

## 10.3 Slide06 Roadmap & Governance

**審査側の問い:** 「計画は測定可能か、実行順序は妥当か？」  
**主張:** 各PhaseはKPI定義でゲート管理される。  
**必要証拠:** Users/Precision/Uptime/False Positive などの明示定義。

推奨ナレーション:

1. Phaseごとにゴールは明文化されている。  
2. KPI閾値を満たすまで次段に進まない。  
3. Governanceは全Phaseを横断して固定する。

## 10.4 Slide07 Demo

**審査側の問い:** 「実運用で本当に意思決定が回るのか？」  
**主張:** 1つのユーザーフローが4エンジンを連続的に通過する。  
**必要証拠:** Stepごとに入力・処理・出力が分離表示されること。

推奨ナレーション:

1. Protectで異常を検知。  
2. Growで見通しと理由を示す。  
3. Executeで人間が承認。  
4. Governで監査ログを確定。

## 10.5 Slide08 Summary

**審査側の問い:** 「結局、戦略の核は何か？」  
**主張:** Governance / Assistant / Business の3柱が同じ価値仮説を支える。  
**必要証拠:** 3カードを比較可能な同構造で配置。

推奨ナレーション:

1. 技術、運用、事業KPIが分断されていない。  
2. 3柱は同じ目標（trusted financial platform）に収束する。

## 10.6 Slide09 Epilogue

**審査側の問い:** 「この場で次に何をすべきか？」  
**主張:** 今すぐデモ導線に接続できる。  
**必要証拠:** CTA（QR）に具体アクションと期待アウトカムが付く。

推奨ナレーション:

1. ここまでの主張は実装可能で検証可能。  
2. QRから即時に体験・検証へ進める。

---

## 11. 画面構造 詳細（Layout Blueprint）

## 11.1 Slide04

1. Header: 22%  
2. 4 Engine cards: 72%  
3. Footer安全域: 6%  

各Engineカード内部:

1. Hero icon  
2. Title  
3. Proof line（1文）  
4. Signal rows（2〜3行）  
5. Key metric badge（任意）

## 11.2 Slide05

1. Header: 20%  
2. Left: Radar/比較図 48%  
3. Right: Unique rows 32%  

## 11.3 Slide06

1. Header: 18%  
2. Rail: 4%  
3. 4 Phase cards: 72%  
4. Footer安全域: 6%

## 11.4 Slide07

1. Header: 20%  
2. 4-step storyboard: 74%  
3. Footer安全域: 6%

## 11.5 Slide08

1. Header: 14%  
2. Vision strip: 18%  
3. 3 pillars: 62%  
4. Footer安全域: 6%

## 11.6 Slide09

1. Title/closing line: 30%  
2. Team credibility: 22%  
3. CTA block: 34%  
4. Footer安全域: 14%

---

## 12. Icon Semantics 辞書（Slide04-09）

設計原則:

1. 1アイコン1概念。  
2. ラベルなしで置かない。  
3. 類似概念に同じアイコンを使い回さない。

推奨マッピング:

1. Protect: `risk-warning`, `shield`  
2. Grow: `wave`, `explainability`  
3. Execute: `consent-check`, `orbit-connector`  
4. Govern: `compliance-badge`, `audit-timeline`, `replay-spiral`  
5. Open Banking: `open-banking`, `regulation-scale`, `api-standard`, `consent-rail`  
6. Demand: `advice-first`, `digital-shift`

禁止パターン:

1. 同一カードで意味の近い装飾アイコンを複数置く。  
2. 小さすぎるアイコン（24px未満）に意味を持たせる。  
3. Glowを強くしすぎて輪郭が潰れる配置。

---

## 13. Data/Copy 契約（copy.ts固定前提）

前提:

1. `copy.ts` の文言は原則編集しない。  
2. 解釈追加は `proof line` / `definition line` で吸収する。

利用フィールド:

1. Slide04: `copy.slide04.*`  
2. Slide05: `copy.slide05.*`  
3. Slide06: `copy.slide06.phases[]`  
4. Slide07: `copy.slide07.*`  
5. Slide08: `copy.slide08.*`  
6. Slide09: `copy.slide09.*`

補助テキストの扱い:

1. 数値定義文は `v2 component内定数` で追加。  
2. 意味ラベルも `v2 component内定数` で追加。  
3. 既存copyの主張と矛盾しないことをレビューで確認。

---

## 14. 実装バッチ分割（Context Window節約）

Batch A:

1. Slide04 semantic polish  
2. Render `Slide04SolutionV2`  
3. 目視レビュー確定

Batch B:

1. Slide06 KPI定義/注記 polish  
2. Render `Slide06BusinessV2`  
3. 目視レビュー確定

Batch C:

1. Slide07 flow clarity polish  
2. Render `Slide07DemoV2`  
3. 目視レビュー確定

Batch D:

1. Slide05 / Slide08 / Slide09 polish  
2. 個別render  
3. deck全体整合確認

Final Batch:

1. 6枚再render  
2. `gen-v2-pptx.js` でPPTX再生成  
3. 変更サマリーを文書に追記

---

## 15. 次回再開用ショートプロンプト（貼り付け用）

```text
Continue semantic polish for Slide04-09 using:
/Users/shinjifujiwara/code/poseidon.ai/remotion/docs/20260205_181900_slide04-09-semantic-polish-playbook.md

Constraints:
- copy.ts freeze
- Remotion-only
- icon + label signal rows
- KPI definitions visible on-slide
- render after each slide change
```

---

## 16. 実行コマンド早見表（運用短縮版）

前提:

1. 作業ディレクトリは `remotion` ルート。  
2. 出力は `remotion/out/` を標準とする。  
3. V2 deck再生成前に対象スライドPNGの更新時刻を確認する。  

基本:

```bash
cd /Users/shinjifujiwara/code/poseidon.ai/remotion
npx tsc --noEmit
npx eslint src/
node scripts/check-readability-gate.mjs
```

単一スライド:

```bash
cd /Users/shinjifujiwara/code/poseidon.ai/remotion
npx remotion still Slide04SolutionV2 out/v2-Slide04SolutionV2.png --scale=2
```

Slide04-09一括:

```bash
cd /Users/shinjifujiwara/code/poseidon.ai/remotion
for comp in Slide04SolutionV2 Slide05DifferentiationV2 Slide06BusinessV2 Slide07DemoV2 Slide08SummaryV2 Slide09EpilogueV2; do
  npx remotion still "$comp" "out/v2-$comp.png" --scale=2
done
```

V2 PPTX:

```bash
cd /Users/shinjifujiwara/code/poseidon.ai/remotion
node scripts/gen-v2-pptx.js
```

成果物:

1. `remotion/out/v2-Slide04SolutionV2.png`  
2. `remotion/out/v2-Slide05DifferentiationV2.png`  
3. `remotion/out/v2-Slide06BusinessV2.png`  
4. `remotion/out/v2-Slide07DemoV2.png`  
5. `remotion/out/v2-Slide08SummaryV2.png`  
6. `remotion/out/v2-Slide09EpilogueV2.png`  
7. `remotion/out/Poseidon_AI_MIT_CTO_V2_Visual_First.pptx`  

---

## 17. 品質ルーブリック（スコアリング）

採点方法:

1. 各項目 `0-2` 点（0:不合格 / 1:部分達成 / 2:達成）。  
2. 1スライドあたり満点10点。  
3. 合格ラインは **8点以上かつ項目3・4は必ず2点**。  

評価項目:

1. メッセージ一意性: 10秒で1文要約できるか。  
2. 意味ユニット化: `icon + label` が崩れていないか。  
3. 数値定義: 単位・期間・閾値が同画面で読めるか。  
4. 可読性: 見出し/本文/注記が重ならず読めるか。  
5. 遷移接続: 前後スライドとの接続詞に矛盾がないか。  

記録フォーマット:

```text
Slide06: 9/10
- メッセージ一意性: 2
- 意味ユニット化: 2
- 数値定義: 2
- 可読性: 2
- 遷移接続: 1
Action: 遷移接続詞をSlide07導入に寄せる
```

---

## 18. KPI定義辞書（Slide06で必須表示）

原則:

1. KPI名は略称で隠さない。  
2. しきい値は `>=` / `<=` を明示。  
3. 母集団と測定期間を同時表示。  

推奨定義:

1. Users: `30-day active users`, 期間 `rolling 30d`。  
2. Precision: `TP / (TP + FP)`、対象は「高リスク検知イベント」。  
3. Uptime: `service availability`, 期間 `monthly`。  
4. False Positive: `FP rate`, 対象は「要承認イベント」。  

注記テンプレ:

```text
Users = active customers (rolling 30d)
Precision = TP / (TP + FP), high-risk events
Uptime = monthly availability
False Positive = flagged-but-invalid ratio
```

---

## 19. 典型的な崩れ方と修正優先度

P0（即修正）:

1. テキスト重なり・切れ・カード外はみ出し。  
2. KPI閾値と注記文の意味不一致。  
3. CTA導線（Slide09）の行動文欠落。  

P1（当日修正）:

1. 装飾アイコン化（ラベルがない/意味が弱い）。  
2. 比較表で粒度が揃っていない。  
3. 1カード内の主張競合（複数メッセージ）。  

P2（次バッチ修正）:

1. Glow過多で輪郭が滲む。  
2. 行間・余白の不統一。  
3. 接続詞のトーン不一致。  

---

## 20. レビュー観点チェックリスト（提出前）

必須:

1. `tsc` / `eslint` / still render / pptx が成功している。  
2. Slide04-09の全PNG更新時刻が今回作業時刻になっている。  
3. 6枚すべてに「証拠文」または「定義文」がある。  
4. Footer安全域内に要素が侵入していない。  
5. 英数字の桁組み（`tnum`）が崩れていない。  

目視:

1. 3m離れても主見出しが読める。  
2. 10秒ナレーションで詰まらない。  
3. 04→09の物語が逆再生しても矛盾しない。  

---

## 21. 障害対応ランブック（短縮）

### 21.1 Remotion renderでChromium起動失敗（SIGABRT）

1. 同じ `npx remotion still ...` を再実行。  
2. それでも失敗する場合は実行権限（sandbox外）で再実行。  
3. 成功後は対象PNGの更新時刻を確認する。  

### 21.2 アイコンが表示されない

1. `remotion/public/assets/svg/icons/icon-*.svg` のファイル名を確認。  
2. `SlideIcon name` と実ファイル名の一致を確認。  
3. `icon-` prefixの重複指定有無を確認。  

### 21.3 PPTXに古いPNGが混入

1. `out/v2-*.png` の更新時刻を全件確認。  
2. 必要スライドのみ再render。  
3. `node scripts/gen-v2-pptx.js` を再実行。  

---

## 22. 変更記録テンプレ（この文書末尾に追記）

```text
### Update Log
- Date: YYYY-MM-DD HH:mm
- Scope: Slide04, Slide06
- Message delta:
  - Slide04: "統合アーキテクチャ" -> "監査可能な実行系"
  - Slide06: KPI注記の母集団を明文化
- Files:
  - remotion/src/v2/Slide04SolutionV2.tsx
  - remotion/src/v2/Slide06BusinessV2.tsx
- Verification:
  - tsc: pass
  - eslint: pass
  - still: pass
  - pptx: regenerated
- Remaining risks:
  - Slide07ナレーション接続詞を次バッチで微調整
```

---

## 23. Scope外ルール（誤着手防止）

1. この手順書の対象は Slide04-09 のみ。  
2. Slide01-03/Slide02の設計変更は別プレイブックで扱う。  
3. production成果物の最終根拠は Remotion render 結果とする。  

### Update Log
- Date: 2026-02-06 00:00
- Scope: Slide02 (Option A), Slide03-08, Slide01 engine pills, shared icon system
- Message delta:
  - Unified active V2 deck icons to Slide03-level semantic polish baseline
  - Added `signal` icon variant for row/list semantics and migrated active deck usage from `simple`
- Files:
  - remotion/src/shared/SlideIcon.tsx
  - remotion/src/shared/EnginePill.tsx
  - remotion/src/v2/Slide02ProblemOptionA.tsx
  - remotion/src/v2/Slide03WhyNowV2.tsx
  - remotion/src/v2/Slide04SolutionV2.tsx
  - remotion/src/v2/Slide05DifferentiationV2.tsx
  - remotion/src/v2/Slide06BusinessV2.tsx
  - remotion/src/v2/Slide08SummaryV2.tsx
  - remotion/public/assets/svg/icons/icon-advice-first.svg
  - remotion/public/assets/svg/icons/icon-ai-brain.svg
  - remotion/public/assets/svg/icons/icon-api-standard.svg
  - remotion/public/assets/svg/icons/icon-audit-timeline.svg
  - remotion/public/assets/svg/icons/icon-compliance-badge.svg
  - remotion/public/assets/svg/icons/icon-consent-check.svg
  - remotion/public/assets/svg/icons/icon-data-grid.svg
  - remotion/public/assets/svg/icons/icon-digital-shift.svg
  - remotion/public/assets/svg/icons/icon-explainability.svg
  - remotion/public/assets/svg/icons/icon-gear.svg
  - remotion/public/assets/svg/icons/icon-govern-core.svg
  - remotion/public/assets/svg/icons/icon-insight-lamp.svg
  - remotion/public/assets/svg/icons/icon-open-banking.svg
  - remotion/public/assets/svg/icons/icon-orbit-connector.svg
  - remotion/public/assets/svg/icons/icon-pulse.svg
  - remotion/public/assets/svg/icons/icon-regulation-scale.svg
  - remotion/public/assets/svg/icons/icon-replay-spiral.svg
  - remotion/public/assets/svg/icons/icon-risk-warning.svg
  - remotion/public/assets/svg/icons/icon-shield.svg
  - remotion/public/assets/svg/icons/icon-signal-beam.svg
  - remotion/public/assets/svg/icons/icon-wave.svg
- Verification:
  - tsc: pass
  - eslint: pass
  - readability gate: pass
  - still render: pass
  - pptx: regenerated
- Remaining risks:
  - None observed in Slide01/02/03/04/05/06/08 visual QA pass.

### Update Log (Icon Clarity Recovery)
- Date: 2026-02-05 23:10
- Scope: Slide01, Slide02 (Option A), Slide03-09 icon clarity recovery
- Root cause:
  - Signal icons became decoration-first: nested icon containers + glow stacked over icon SVG decoration reduced glyph legibility.
  - Several icon glyphs were effectively too small at row scale and failed 3-second semantic recognition.
  - Scope drift changed Slide03 and Slide01 despite this playbook targeting Slide04-09.
- Corrective design rules:
  - Glyph-first: semantic glyph occupies ~70-75% of icon canvas.
  - No Gaussian blur in active deck icons.
  - No full-size center background circles (`cx=32 cy=32`) in active deck icons.
  - `signal` variant keeps crisp border and high inner glyph ratio; `glass` keeps premium but reduced ornament.
- Files:
  - remotion/src/shared/SlideIcon.tsx
  - remotion/src/shared/slideLayouts.ts
  - remotion/src/shared/EnginePill.tsx
  - remotion/public/assets/svg/icons/icon-advice-first.svg
  - remotion/public/assets/svg/icons/icon-ai-brain.svg
  - remotion/public/assets/svg/icons/icon-api-standard.svg
  - remotion/public/assets/svg/icons/icon-audit-timeline.svg
  - remotion/public/assets/svg/icons/icon-compliance-badge.svg
  - remotion/public/assets/svg/icons/icon-consent-check.svg
  - remotion/public/assets/svg/icons/icon-data-grid.svg
  - remotion/public/assets/svg/icons/icon-digital-shift.svg
  - remotion/public/assets/svg/icons/icon-explainability.svg
  - remotion/public/assets/svg/icons/icon-gear.svg
  - remotion/public/assets/svg/icons/icon-govern-core.svg
  - remotion/public/assets/svg/icons/icon-insight-lamp.svg
  - remotion/public/assets/svg/icons/icon-open-banking.svg
  - remotion/public/assets/svg/icons/icon-orbit-connector.svg
  - remotion/public/assets/svg/icons/icon-pulse.svg
  - remotion/public/assets/svg/icons/icon-regulation-scale.svg
  - remotion/public/assets/svg/icons/icon-replay-spiral.svg
  - remotion/public/assets/svg/icons/icon-risk-warning.svg
  - remotion/public/assets/svg/icons/icon-shield.svg
  - remotion/public/assets/svg/icons/icon-signal-beam.svg
  - remotion/public/assets/svg/icons/icon-wave.svg
- Verification:
  - tsc: pass
  - eslint: pass
  - readability gate: pass
  - still render: pass
  - pptx: regenerated
