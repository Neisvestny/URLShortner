export default function StatsBar() {
    // TODO: цифры сделать динамичные
    const stats = [
        { num: "2.4M", desc: "ссылок создано" },
        { num: "18M", desc: "переходов" },
        { num: "140+", desc: "стран" },
    ];
    return (
        <div
            style={{
                display: "flex",
                gap: 48,
                marginTop: 64,
                paddingTop: 48,
                borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {stats.map(({ num, desc }) => (
                <div key={desc} style={{ textAlign: "center" }}>
                    <div
                        style={{
                            fontSize: 28,
                            fontWeight: 500,
                            letterSpacing: "-1px",
                        }}
                    >
                        {num}
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                        {desc}
                    </div>
                </div>
            ))}
        </div>
    );
}