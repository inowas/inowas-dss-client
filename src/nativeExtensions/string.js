String.prototype.replaceAll = function(search, replacement) {
    const target = this;
    return target
        .split(search)
        .join(replacement);
};

String.prototype.trimLeft = function(charlist = '\s') {
    return this.replace(new RegExp('^[' + charlist + ']+'), '');
};
