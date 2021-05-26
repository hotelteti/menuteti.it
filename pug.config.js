module.exports = {
  locals: {
		lista: require('./lista.json'),
		slugify: text => text.replace(/[^a-z]/gi, '').toLowerCase(),
		relativizeCDNURL: url => url.replace(/^.*[a-f0-9]{40}\/source\//, ''),
		lineBreakToBr: text => text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')
  }
};