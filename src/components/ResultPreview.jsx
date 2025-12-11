import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Download, Copy, Check } from 'lucide-react';

const ResultPreview = ({ content, onExport, onCopy }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        onCopy();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Generated Prompt</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleCopy} className="btn-secondary" title="Copy to Clipboard">
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                    <button onClick={onExport} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={18} /> Export Prompt .txt
                    </button>
                </div>
            </div>

            <div className="markdown-content" style={{ maxHeight: '760px', overflowY: 'auto', paddingRight: '10px' }}>
                <Markdown options={{
                    overrides: {
                        table: {
                            props: {
                                className: 'glass-table'
                            }
                        }
                    }
                }}>
                    {content}
                </Markdown>
            </div>
        </div>
    );
};

export default ResultPreview;
