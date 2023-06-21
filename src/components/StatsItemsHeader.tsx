import '../styles/StatsItemHeader.css'


const StatsItemHeader = ({}) => {
    return (
        <div className="stats-item-header">
            <div className="stats-item-header-label">Deck</div>
            <div className="stats-item-header-label middle">Mastery</div>
            <div className="stats-item-header-label right">Last Studied</div>
        </div>
    )
}

export default StatsItemHeader