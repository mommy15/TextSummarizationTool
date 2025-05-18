import spacy
from collections import Counter
import string

# Load English tokenizer, POS tagger, etc.
nlp = spacy.load("en_core_web_sm")

def summarize_text(text, num_sentences=3):
    # Parse the text
    doc = nlp(text)

    # Tokenize sentences
    sentences = list(doc.sents)
    if not sentences:
        return "No valid sentences found in the input."

    # If num_sentences is a float (like 0.3), convert to int
    if isinstance(num_sentences, float):
        num_sentences = max(1, int(len(sentences) * num_sentences))
    else:
        num_sentences = max(1, int(num_sentences))

    # Remove punctuation and stopwords, and count word frequencies
    words = [token.text.lower() for token in doc
             if token.text.lower() not in nlp.Defaults.stop_words
             and token.text.lower() not in string.punctuation]

    word_freq = Counter(words)

    # Rank sentences based on the sum of their word frequencies
    sentence_scores = {}
    for sent in sentences:
        for token in sent:
            word = token.text.lower()
            if word in word_freq:
                sentence_scores[sent] = sentence_scores.get(sent, 0) + word_freq[word]

    # Select top 'num_sentences' sentences
    top_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:num_sentences]

    # Sort selected sentences based on their original position
    top_sentences = sorted(top_sentences, key=lambda s: s.start)

    # Combine them into a summary
    summary = ' '.join([sent.text.strip() for sent in top_sentences])
    return summary




