import React, { useState } from 'react';
import axios from 'axios';

function Summarizer() {
  // State to hold user input text, summary, ratio, and Loading status
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [ratio, setRatio] = useState(0.3);
  const [loading, setLoading] = useState(false);
  
  // Function to handle the summarization process
  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/summarize', { text, ratio }, { withCredentials: true });
      setSummary(res.data.summary);
    } catch (err) {
      setSummary("Error summarizing text.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h3>Summarize Text</h3>
      <textarea className="form-control mb-2" rows="8" placeholder="Paste your text here..." value={text} onChange={e => setText(e.target.value)} />
      <div className="mb-2">
        <label>Summarization Ratio: {ratio}</label>
        <input type="range" min="0.1" max="0.9" step="0.1" value={ratio} onChange={e => setRatio(e.target.value)} className="form-range" />
      </div>
      <button className="btn btn-success mb-3" onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      <div className="row">
        <div className="col-md-6">
          <h5>Original Text</h5>
          <div className="border p-2">{text}</div>
        </div>
        <div className="col-md-6">
          <h5>Summary</h5>
          <div className="border p-2">{summary}</div>
        </div>
      </div>
    </div>
  );
}

export default Summarizer;
