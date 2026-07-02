function EmmaInsightCard({ insight }) {
  return (
    <div className="emmaInsightCard">
      <h2>Today's Insight</h2>

      <p>{insight}</p>
    </div>
  );
}

export default EmmaInsightCard;