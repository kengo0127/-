
import { useState } from "react";

const tasks = [
  { id: "t01", phase: 1, p: "p1", name: "中小企業診断士の登録申請（実務補習完了後）", badge: "最優先", detail: { pros: "登録なしでは「診断士として」名乗れない。名称独占資格なので登録が活動の前提。", cons: "登録証が届くまで数週間かかる。申請が遅れると活動開始も後ろ倒しに。" } },
  { id: "t02", phase: 1, p: "p1", name: "開業届の提出（税務署）＋青色申告承認申請", badge: "最優先", detail: { pros: "青色申告で最大65万円控除。経費計上の根拠になる。", cons: "青色申告承認申請は事業開始から2ヶ月以内が期限。後回しにすると今年分は白色に。", note: "✔ すでに個人事業主登録済みなら追加手続き不要の可能性あり。税務署に確認を。" } },
  { id: "t03", phase: 1, p: "p2", name: "本業との利益相反・情報管理ルールの確認", badge: "高優先", detail: { pros: "副業OKでも「競合他社支援はNG」等の条件がある場合が多い。事前確認で後のリスクゼロに。", cons: "特に製造業クライアントを支援する場合、本業と業種が重なるケースに注意。" } },
  { id: "t04", phase: 2, p: "p1", name: "強み・提供価値の言語化（スキル棚卸し）", badge: "最優先", detail: { pros: "製造業の現場感覚を持つ診断士・IoT/AI導入支援・データドリブンな経営改善提案・補助金申請×設備投資の一体支援", cons: "「なんでもできます」は最も弱い自己PR。最初は「製造業×DX×補助金」など1〜2軸に絞った方が刺さる。" } },
  { id: "t05", phase: 2, p: "p1", name: "個人HP のアップデート（診断士対応）", badge: "最優先", detail: { pros: "サービス一覧・保有資格・問い合わせフォーム・料金目安を追加するだけ。すでにHPあり大きなアドバンテージ。", cons: "完璧を目指さず「動ける状態」優先。実績ゼロでも「支援可能領域」の記載でOK。" } },
  { id: "t06", phase: 2, p: "p2", name: "名刺の作成（診断士肩書き入り）", badge: "高優先", detail: { pros: "異業種交流会・協会イベント等でのネットワーキングに必須。登録証が届いたらすぐ発注できるよう事前にデザインを準備。", cons: "100〜200枚で2,000〜5,000円程度。Vistaprint等のオンライン印刷が安い。" } },
  { id: "t07", phase: 2, p: "p2", name: "中小企業診断士協会への加入検討", badge: "高優先", detail: { pros: "研究会・支部活動を通じた案件紹介、人脈構築。「稼プロ」等の実務系研究会は案件獲得への近道。", cons: "年会費：東京協会で約30,000円/年。加入しなくても活動は可能だが人脈形成の速度が変わる。", note: "💡 まず「プロコン塾」「研究会の見学」など無料・低コストの接点から入る方法もある。" } },
  { id: "t08", phase: 2, p: "p3", name: "SNS（X / LinkedIn）のプロフィール整備", badge: "中優先", detail: { pros: "Xは診断士クラスタが活発。情報収集と認知形成が同時にできる。LinkedInは企業担当者・支援機関との接点に有効。", cons: "本業特定リスクに注意。「製造業R&D勤務」程度の記載に留め、会社名・プロジェクト名は出さない。" } },
  { id: "t09", phase: 3, p: "p1", name: "補助金支援プラットフォームへの登録（ミラサポplus等）", badge: "最優先", detail: { pros: "ものづくり補助金・IT導入補助金は製造業クライアントと相性抜群。成功報酬型も多く初期リスク低い。", cons: "登録支援機関は「認定経営革新等支援機関」の認定が必要。まず既存機関と協力する形から始める手もある。", note: "💡 最初の1件は「知人の会社の補助金申請を手伝う」が最短ルート。" } },
  { id: "t10", phase: 3, p: "p2", name: "クラウドソーシング・副業プラットフォームへの登録", badge: "高優先", detail: { pros: "ビザスクは時給制スポット相談が多く初案件に適している（1時間3〜5万円程度）。", cons: "手数料が高い（20〜30%）。長期的には直接受注へ移行が理想。" } },
  { id: "t11", phase: 3, p: "p3", name: "地域の商工会議所・よろず支援拠点へのコンタクト", badge: "中優先", detail: { pros: "公的機関経由の案件は継続性が高い。コーディネーターとして登録されれば月次で相談案件が回ってくる。", cons: "単価は低め（謝礼制）。実績・経験値の蓄積という意味では序盤に最適。" } },
  { id: "t12", phase: 3, p: "p4", name: "セミナー登壇・勉強会主催", badge: "低優先", detail: { pros: "「IoT×製造業DX」テーマは競合が少なく専門性を示しやすい。", cons: "準備工数が大きい。3〜6ヶ月後に実績を得てからの方が信頼度が高い。" } },
  { id: "t13", phase: 4, p: "p2", name: "補助金最新情報のキャッチアップ（ものづくり・IT導入・事業再構築）", badge: "高優先", detail: { pros: "J-Net21・中小機構・各補助金公式サイトをRSS等で定期チェック。", note: "💡 製造業クライアントに最も刺さるのは「ものづくり補助金」。要件・採択率・審査の傾向を深く理解しておくと提案力が段違いになる。" } },
  { id: "t14", phase: 4, p: "p3", name: "財務分析・収益改善提案の型づくり", badge: "中優先", detail: { pros: "決算書から3〜5のKPIを抽出して改善提案につなげる型を持つと、初回面談からの信頼度が大きく変わる。", cons: "試験知識と実務は異なる。事例集や勉強会で補強推奨。" } },
];

const phases = [
  { num: 1, title: "登録・法的整備", timing: "〜登録申請直後" },
  { num: 2, title: "自己ブランディング・集客基盤", timing: "登録後 1ヶ月以内" },
  { num: 3, title: "案件獲得チャネルの開拓", timing: "1〜2ヶ月以内" },
  { num: 4, title: "知識・スキルの整備", timing: "並行して随時" },
];

const colors = {
  p1: { bar: "#c8a96e", badge: "rgba(200,169,110,0.15)", badgeBorder: "rgba(200,169,110,0.3)", badgeText: "#c8a96e" },
  p2: { bar: "#7eb8c8", badge: "rgba(126,184,200,0.12)", badgeBorder: "rgba(126,184,200,0.25)", badgeText: "#7eb8c8" },
  p3: { bar: "#8ec87e", badge: "rgba(142,200,126,0.1)", badgeBorder: "rgba(142,200,126,0.2)", badgeText: "#8ec87e" },
  p4: { bar: "#888", badge: "rgba(136,136,136,0.1)", badgeBorder: "rgba(136,136,136,0.2)", badgeText: "#888" },
};

export default function App() {
  const [done, setDone] = useState(new Set());
  const [open, setOpen] = useState(new Set());

  const toggleDone = (id, e) => {
    e.stopPropagation();
    setDone(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleOpen = (id) => {
    setOpen(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const pct = Math.round(done.size / tasks.length * 100);

  return (
    <div style={{ background: "#0d0d0f", minHeight: "100vh", color: "#e8e4dc", fontFamily: "serif", fontWeight: 300, lineHeight: 1.8 }}>
      {/* Header */}
      <div style={{ padding: "2.5rem 1.5rem 2rem", textAlign: "center", borderBottom: "1px solid #2a2a2e", background: "radial-gradient(ellipse at 50% -20%, rgba(200,169,110,0.08) 0%, transparent 60%)" }}>
        <div style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#c8a96e", textTransform: "uppercase", marginBottom: "0.8rem", opacity: 0.8 }}>Side Business Launch Roadmap</div>
        <div style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)", fontWeight: 600, letterSpacing: "0.05em", lineHeight: 1.4 }}>中小企業診断士 副業<br />準備ロードマップ</div>
        <div style={{ marginTop: "0.6rem", fontSize: "0.75rem", color: "#888" }}>登録申請後 〜 最初の案件受注まで ／ 製造R&D×データ解析×IoT の強みを活かす</div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", marginBottom: "2rem", padding: "1rem 1.2rem", background: "#141416", border: "1px solid #2a2a2e", borderRadius: 2 }}>
          {[["#c8a96e","最優先・今すぐ"],["#7eb8c8","高優先・1ヶ月以内"],["#8ec87e","中優先・2〜3ヶ月"],["#888","低優先・必要時"]].map(([c,l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "monospace", fontSize: "0.65rem", color: "#888" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: c, flexShrink: 0 }} />{l}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ marginBottom: "1.5rem", padding: "0.9rem 1.2rem", background: "#141416", border: "1px solid #2a2a2e", borderRadius: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: "0.6rem", color: "#888", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
            <span>PROGRESS</span><span>{done.size} / {tasks.length} 完了</span>
          </div>
          <div style={{ height: 3, background: "#2a2a2e", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "#8ec87e", borderRadius: 2, width: `${pct}%`, transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Phases */}
        {phases.map(ph => (
          <div key={ph.num} style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem", paddingBottom: "0.7rem", borderBottom: "1px solid #2a2a2e" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#555", letterSpacing: "0.2em" }}>PHASE 0{ph.num}</span>
              <span style={{ fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.1em" }}>{ph.title}</span>
              <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: "0.6rem", color: "#c8a96e", whiteSpace: "nowrap" }}>{ph.timing}</span>
            </div>

            {tasks.filter(t => t.phase === ph.num).map(t => {
              const c = colors[t.p];
              const isDone = done.has(t.id);
              const isOpen = open.has(t.id);
              return (
                <div key={t.id} style={{ display: "grid", gridTemplateColumns: "4px 1fr", gap: "0 1rem", marginBottom: "0.8rem", background: "#141416", border: "1px solid #2a2a2e", borderRadius: 2, overflow: "hidden", opacity: isDone ? 0.45 : 1 }}>
                  <div style={{ background: isDone ? "#8ec87e" : c.bar }} />
                  <div style={{ padding: "0.9rem 1rem 0.9rem 0" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.8rem", cursor: "pointer" }} onClick={() => toggleOpen(t.id)}>
                      <button
                        onClick={(e) => toggleDone(t.id, e)}
                        style={{ width: 20, height: 20, border: `1.5px solid ${isDone ? "#8ec87e" : "#2a2a2e"}`, borderRadius: 3, flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: isDone ? "#8ec87e" : "transparent", marginTop: 2 }}
                      >
                        {isDone && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><polyline points="1,4.5 4,7.5 10,1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </button>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.85rem", color: isDone ? "#888" : "#e8e4dc", textDecoration: isDone ? "line-through" : "none", lineHeight: 1.5 }}>{t.name}</div>
                        <div style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "#555", marginTop: "0.3rem" }}>tap to expand</div>
                      </div>
                      <div style={{ fontFamily: "monospace", fontSize: "0.58rem", padding: "0.12rem 0.45rem", borderRadius: 1, whiteSpace: "nowrap", background: c.badge, color: c.badgeText, border: `1px solid ${c.badgeBorder}`, opacity: isDone ? 0.4 : 1 }}>{t.badge}</div>
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: "0.7rem", paddingTop: "0.7rem", borderTop: "1px solid #2a2a2e", fontSize: "0.78rem", color: "#888", lineHeight: 1.8 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
                          {t.detail.pros && (
                            <div style={{ padding: "0.6rem 0.8rem", background: "rgba(142,200,126,0.06)", border: "1px solid rgba(142,200,126,0.15)", borderRadius: 1 }}>
                              <div style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "#8ec87e", letterSpacing: "0.15em", marginBottom: "0.3rem" }}>メリット</div>
                              {t.detail.pros}
                            </div>
                          )}
                          {t.detail.cons && (
                            <div style={{ padding: "0.6rem 0.8rem", background: "rgba(200,126,126,0.06)", border: "1px solid rgba(200,126,126,0.15)", borderRadius: 1 }}>
                              <div style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "#c87e7e", letterSpacing: "0.15em", marginBottom: "0.3rem" }}>注意</div>
                              {t.detail.cons}
                            </div>
                          )}
                        </div>
                        {t.detail.note && (
                          <div style={{ marginTop: "0.5rem", padding: "0.45rem 0.7rem", background: "rgba(200,169,110,0.05)", borderLeft: "2px solid rgba(200,169,110,0.3)", fontSize: "0.72rem" }}>
                            {t.detail.note}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Summary */}
        <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "#1a1a1d", border: "1px solid #2a2a2e", borderRadius: 2 }}>
          <div style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.8rem", color: "#c8a96e", letterSpacing: "0.1em" }}>🧭 最初の30日でやること（優先度順）</div>
          <div style={{ fontSize: "0.78rem", color: "#888", lineHeight: 1.9 }}>
            <span style={{ color: "#c8a96e", fontWeight: 600 }}>① 登録申請の完了</span> →{" "}
            <span style={{ color: "#c8a96e", fontWeight: 600 }}>② スキル棚卸し・強みの言語化</span> →{" "}
            <span style={{ color: "#c8a96e", fontWeight: 600 }}>③ HPに診断士サービスページを追加</span> →{" "}
            <span style={{ color: "#c8a96e", fontWeight: 600 }}>④ 補助金プラットフォームへの登録開始</span> →{" "}
            <span style={{ color: "#c8a96e", fontWeight: 600 }}>⑤ 協会加入を検討</span>。
            <br /><br />
            名刺・SNS・セミナーは②〜④が動き出してから。完璧を待たず「動ける最低限」で出発し、実績とともにブラッシュアップする方が早く軌道に乗る。
          </div>
        </div>
      </div>
    </div>
  );
}
