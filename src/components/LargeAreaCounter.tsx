export default function LargeAreaCounter({m_2}: {m_2: number}) {
    let km2 = (m_2 / 1000000).toFixed(4)

    return <div>{km2} km<sup>2</sup></div>
}