
/*
 * DateDiff
 * is a minimalized Javascript date arithmetic extension.
 * Copyright (c) 2015 Melvin Sembrano (melvinsembrano@gmail.com)
 * License: MIT
 */

(function() {
  var DateDiff, divisors;

  DateDiff = function(date1, date2) {
    this.date1 = date1;
    this.date2 = date2;
    this.difference = Math.floor(date1 - date2);
  };

  divisors = {
    days: 1000 * 60 * 60 * 24,
    hours: 1000 * 60 * 60,
    minutes: 1000 * 60,
    seconds: 1000
  };

  DateDiff.prototype.weeks = function() {
    return this._roundIt(this.days() / 7);
  };

  DateDiff.prototype.days = function() {
    return this._roundIt(this.difference / divisors.days);
  };

  DateDiff.prototype.hours = function() {
    return this._roundIt(this.difference / divisors.hours);
  };

  DateDiff.prototype.minutes = function() {
    return this._roundIt(this.difference / divisors.minutes);
  };

  DateDiff.prototype.seconds = function() {
    return this._roundIt(this.difference / divisors.seconds);
  };

  DateDiff.prototype.months = function() {
    var eom, ret;
    ret = (this.date1.getFullYear() - this.date2.getFullYear()) * 12;
    ret += this.date1.getMonth() - this.date2.getMonth();
    eom = this.endOfMonth(this.date2).getDate();
    ret += (this.date1.getDate() / eom) - (this.date2.getDate() / eom);
    return this._roundIt(ret);
  };

  DateDiff.prototype.years = function() {
    return this.months() / 12;
  };

  DateDiff.prototype.endOfMonth = function(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  DateDiff.prototype.endOfYear = function(date) {
    return new Date(date.getFullYear() + 1, 0, 0);
  };

  DateDiff.prototype._roundIt = function(v) {
    return parseFloat(v.toFixed(1));
  };

  Date.diff = function(date1, date2) {
    return new DateDiff(date1, date2);
  };

  this.DateDiff = DateDiff;

  if (typeof module !== "undefined") {
    module.exports = DateDiff;
  }

}).call(this);
