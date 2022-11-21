/*! For license information please see bundle.js.LICENSE.txt */
!function () {
    var t = {
        556: function (t, e, n) {
            "use strict";
            var i = n(81), o = n.n(i), r = n(645), s = n.n(r), a = n(667), h = n.n(a), l = new URL(n(424), n.b),
                c = s()(o()), d = h()(l);
            c.push([t.id, "html, body {\n    overflow: hidden;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    display: flex;\n    align-content: center;\n    flex-direction: row;\n    background-color: #426a79;\n}\n\n.unselectable {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.headerBackground{\n    position: absolute;\n    width: 100%;\n    height: 5rem;\n    background-color: #364147;\n    top: 0%;\n    z-index: -1;\n}\n\n.content{\n    width: 60%;\n    max-width: 1200px;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    align-content: center;\n}\n\n@font-face {\n    font-family: Gidole;\n    font-style: normal;\n    font-weight: 400;\n    src: url(" + d + ") format('ttf');\n}\n\n.header {\n    font-family: 'Gidole', monospace;\n    user-select: none;\n    color: #efe7da;\n    cursor: pointer;\n}\n\n.headerDiv{\n    width: 100%;\n    height: 5rem;\n    user-select: none;\n    display: flex;\n    flex-direction: column;\n    align-content: center;\n}\n\n.drawingArea{\n    display: flex;\n    position: relative;\n    height: 100%;\n}\n\ncanvas {\n    -webkit-tap-highlight-color: transparent;\n    touch-action: none;\n    z-index: 1;\n    display: block;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n}\n\n.button {\n    width: 128px;\n    height: 128px;\n    display: block;\n    margin: 2rem;\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    z-index: 2;\n    user-select: none;\n}\n\n.footerDiv{\n    display: flex;\n    justify-content: center;\n    flex-direction: row;\n    width: 100%;\n    min-height: 0.75rem;\n}\n\n.footer {\n    margin: 0.5rem;\n    font-family: 'Gidole', monospace;\n    color: #efe7da;\n    user-select: none;\n}\n\n.footerSpacer{\n    width: 5rem;\n}\n\n@media only screen and (max-width: 1200px) {\n    .content{\n        width: 80%;\n    }\n}\n\n@media only screen and (max-width: 800px) {\n    .content{\n        width: 100%;\n    }\n    .header{\n        padding-left: 1rem;\n    }\n}", ""]), e.Z = c
        }, 399: function (t, e, n) {
            "use strict";
            var i = n(81), o = n.n(i), r = n(645), s = n.n(r)()(o());
            s.push([t.id, ".modal {\n    color: green;\n}\n\n.ModalBox {\n    display: flex;\n    flex-direction: column;\n    background-color: #fdfffc;\n    justify-content: right;\n    gap: 0.4rem;\n    max-width: 80%;\n    min-width: 60%;\n    max-height: 80%;\n    min-height: 80%;\n    padding: 1.3rem;\n    overflow-y: auto;\n    position: absolute;\n    top: 10%;\n    box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.39);\n    z-index: 4;\n    border: 1px solid #ddd\n}\n\n.modalContent {\n    display: flex;\n    flex-direction: column;\n    justify-content: left;\n    gap: 0.4rem;\n    width: 100%;\n    height: 80%;\n    padding: 64px 0 0 0;\n    font-family: monospace;\n}\n\n.modalCloseButton {\n    position: fixed;\n    z-index: 6;\n    border-radius: 64px;\n    border: 1px solid;\n    background-color: #d62828;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n    min-height: 64px;\n    min-width: 64px;\n    max-width: 64px;\n    max-width: 64px;\n    float: right;\n    margin: 0px;\n    padding: 0px;\n    clear: both;\n    float: right;\n    font-size: 4ref;\n}\n\n.blur {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.5);\n    backdrop-filter: blur(3px);\n    z-index: 3;\n}", ""]), e.Z = s
        }, 645: function (t) {
            "use strict";
            t.exports = function (t) {
                var e = [];
                return e.toString = function () {
                    return this.map((function (e) {
                        var n = "", i = void 0 !== e[5];
                        return e[4] && (n += "@supports (".concat(e[4], ") {")), e[2] && (n += "@media ".concat(e[2], " {")), i && (n += "@layer".concat(e[5].length > 0 ? " ".concat(e[5]) : "", " {")), n += t(e), i && (n += "}"), e[2] && (n += "}"), e[4] && (n += "}"), n
                    })).join("")
                }, e.i = function (t, n, i, o, r) {
                    "string" == typeof t && (t = [[null, t, void 0]]);
                    var s = {};
                    if (i) for (var a = 0; a < this.length; a++) {
                        var h = this[a][0];
                        null != h && (s[h] = !0)
                    }
                    for (var l = 0; l < t.length; l++) {
                        var c = [].concat(t[l]);
                        i && s[c[0]] || (void 0 !== r && (void 0 === c[5] || (c[1] = "@layer".concat(c[5].length > 0 ? " ".concat(c[5]) : "", " {").concat(c[1], "}")), c[5] = r), n && (c[2] ? (c[1] = "@media ".concat(c[2], " {").concat(c[1], "}"), c[2] = n) : c[2] = n), o && (c[4] ? (c[1] = "@supports (".concat(c[4], ") {").concat(c[1], "}"), c[4] = o) : c[4] = "".concat(o)), e.push(c))
                    }
                }, e
            }
        }, 667: function (t) {
            "use strict";
            t.exports = function (t, e) {
                return e || (e = {}), t ? (t = String(t.__esModule ? t.default : t), /^['"].*['"]$/.test(t) && (t = t.slice(1, -1)), e.hash && (t += e.hash), /["'() \t\n]|(%20)/.test(t) || e.needQuotes ? '"'.concat(t.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : t) : t
            }
        }, 81: function (t) {
            "use strict";
            t.exports = function (t) {
                return t[1]
            }
        }, 945: function (t, e) {
            !function (t) {
                "use strict";
                var e = function (t, n) {
                    return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(t, n)
                }, n = function () {
                    return (n = Object.assign || function (t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                };

                function i(t, e) {
                    for (var n = 0; n < t.length; n++) t[n] = e;
                    return t
                }

                function o(t, e) {
                    for (var n = 0; n < t.length; n++) t[n] = e(t[n], n);
                    return t
                }

                function r(t, e, n) {
                    void 0 === n && (n = 0);
                    for (var i = 0; i < t.length; i++) n = e(n, t[i], i);
                    return n
                }

                var s = Math.pow(2, -42);

                function a(t) {
                    var e = Math.pow(Math.abs(t), 1 / 3);
                    return t < 0 ? -e : e
                }

                function h(t, e, n) {
                    if (Math.abs(t) < s) return Math.abs(e) < s ? [] : [-n / e];
                    var i = e * e - 4 * t * n;
                    return Math.abs(i) < s ? [-e / (2 * t)] : i > 0 ? [(-e + Math.sqrt(i)) / (2 * t), (-e - Math.sqrt(i)) / (2 * t)] : []
                }

                function l(t, e, n, i) {
                    if (Math.abs(t) < s) return h(e, n, i);
                    var o, r = (3 * t * n - e * e) / (3 * t * t),
                        l = (2 * e * e * e - 9 * t * e * n + 27 * t * t * i) / (27 * t * t * t);
                    if (Math.abs(r) < s) o = [a(-l)]; else if (Math.abs(l) < s) o = [0].concat(r < 0 ? [Math.sqrt(-r), -Math.sqrt(-r)] : []); else {
                        var c = l * l / 4 + r * r * r / 27;
                        if (Math.abs(c) < s) o = [-1.5 * l / r, 3 * l / r]; else if (c > 0) o = [(d = a(-l / 2 - Math.sqrt(c))) - r / (3 * d)]; else {
                            var d = 2 * Math.sqrt(-r / 3), u = Math.acos(3 * l / r / d) / 3, g = 2 * Math.PI / 3;
                            o = [d * Math.cos(u), d * Math.cos(u - g), d * Math.cos(u - 2 * g)]
                        }
                    }
                    for (var f = 0; f < o.length; f++) o[f] -= e / (3 * t);
                    return o
                }

                function c(t, e, n, i, o, r) {
                    void 0 === o && (o = 0), void 0 === r && (r = .5);
                    var s = (1 - r) * (n - t) * .5, a = (1 - r) * (i - e) * .5;
                    return [2 * e - 2 * n + s + a, -3 * e + 3 * n - 2 * s - a, s, e - o]
                }

                function d(t, e, n, i, o, r) {
                    if (Math.abs(t) < s) return i;
                    if (Math.abs(1 - t) < s) return o;
                    var a = t * t, h = t * a, l = c(n, i, o, r, 0, e);
                    return l[0] * h + l[1] * a + l[2] * t + l[3]
                }

                function u(t, e, n, i, o, r) {
                    var s = t * t, a = c(n, i, o, r, 0, e);
                    return 3 * a[0] * s + 2 * a[1] * t + a[2]
                }

                function g(t, e) {
                    return Math.sqrt(r(e, (function (e, n, i) {
                        return e + Math.pow(n - t[i], 2)
                    })))
                }

                function f(t) {
                    var e = r(t, (function (t, e) {
                        return t + Math.pow(e, 2)
                    })), n = Math.sqrt(e);
                    return 0 === n ? i(t, 0) : o(t, (function (t) {
                        return t / n
                    }))
                }

                function p(t) {
                    if (t.length > 2) throw Error("Only supported for 2d vectors");
                    var e = -t[1];
                    return t[1] = t[0], t[0] = e, t
                }

                function m(t, e, n) {
                    return void 0 === e && (e = 0), void 0 === n && (n = 1), t < e ? e : t > n ? n : t
                }

                function v(t, e, n) {
                    var i, o, r, s, a = e.length - 1;
                    return n ? (i = e[t - 1 < 0 ? a : t - 1], o = e[t % e.length], r = e[(t + 1) % e.length], s = e[(t + 2) % e.length]) : (i = e[Math.max(0, t - 1)], o = e[t], r = e[Math.min(a, t + 1)], s = e[Math.min(a, t + 2)]), [i, o, r, s]
                }

                function y(t, e, n, i) {
                    void 0 === n && (n = {});
                    var o = Number.isFinite(n.tension) ? n.tension : .5, r = !!n.closed, s = n.func || d,
                        a = r ? e.length : e.length - 1, h = a * t, l = Math.floor(h), c = h - l, u = v(l, e, r),
                        g = u[0], f = u[1], p = u[2], m = u[3];
                    i = i || new Array(g.length);
                    for (var y = 0; y < g.length; y++) i[y] = s(c, o, g[y], f[y], p[y], m[y]);
                    return 3 === a && i[1], i
                }

                function w(t, e, n, i) {
                    void 0 === n && (n = {});
                    var o = Number.isFinite(n.tension) ? n.tension : .5, r = !!n.closed;
                    return 1 === o && 0 === t ? t += s : 1 === o && 1 === t && (t -= s), y(t, e, {
                        tension: o,
                        closed: r,
                        func: u
                    }, i)
                }

                function b(t, e, n) {
                    void 0 === n && (n = {});
                    var i, o = [], r = y(0, t, n), s = 0;
                    e = e || 300, o.push(0);
                    for (var a = 1; a <= e; a++) s += g(i = y(a / e, t, n), r), o.push(s), r = i;
                    return o
                }

                function P(t, e) {
                    for (var n, i = e.length, o = t * e[i - 1], r = 0, s = i - 1, a = 0; r <= s;) if ((n = e[a = Math.floor(r + (s - r) / 2)] - o) < 0) r = a + 1; else {
                        if (!(n > 0)) {
                            s = a;
                            break
                        }
                        s = a - 1
                    }
                    if (e[a = s] === o) return a / (i - 1);
                    var h = e[a];
                    return (a + (o - h) / (e[a + 1] - h)) / (i - 1)
                }

                function x(t, e) {
                    if (0 === t) return 0;
                    if (1 === t) return 1;
                    var n = e.length - 1, i = e[n], o = t * n, r = Math.floor(o), s = e[r];
                    return o === r ? s / i : (s + (o - r) * (e[r + 1] - s)) / i
                }

                function C(t, e, n, i, o, r) {
                    var a = c(n, i, o, r, t, e), h = a[0], d = a[1], u = a[2], g = a[3];
                    return 0 === h && 0 === d && 0 === u && 0 === g ? [0] : l(h, d, u, g).filter((function (t) {
                        return t > -s && t <= 1 + s
                    })).map((function (t) {
                        return m(t, 0, 1)
                    }))
                }

                function M(t, e, i) {
                    for (var o = n({
                        axis: 0,
                        tension: .5,
                        closed: !1,
                        margin: .5,
                        max: 0,
                        processRefAxis: !1,
                        func: d
                    }, i), r = o.func, s = o.axis, a = o.tension, h = o.closed, l = o.margin, c = o.max, u = o.processRefAxis, g = s, f = [], p = h ? e.length : e.length - 1, m = 0; m < p; m += 1) {
                        var y = c < 0 ? p - (m + 1) : m, w = v(y, e, h), b = w[0], P = w[1], x = w[2], M = w[3],
                            S = void 0, D = void 0;
                        if (P[g] < x[g] ? (S = P[g], D = x[g]) : (S = x[g], D = P[g]), t - l <= D && t + l >= S) {
                            var T = C(t, a, b[g], P[g], x[g], M[g]);
                            c < 0 ? T.sort((function (t, e) {
                                return e - t
                            })) : c >= 0 && T.sort((function (t, e) {
                                return t - e
                            }));
                            for (var L = 0; L < T.length; L++) if (!(0 === T[L] && m > 0)) {
                                for (var _ = [], B = 0; B < b.length; B++) {
                                    var I;
                                    I = B !== g || u ? r(T[L], a, b[B], P[B], x[B], M[B], y - 1) : t, _[B] = I
                                }
                                if (f.push(_), f.length === Math.abs(c)) return f
                            }
                        }
                    }
                    return f
                }

                function S(t, e, i) {
                    for (var o = n({
                        axis: 0,
                        tension: .5,
                        closed: !1,
                        margin: .5,
                        max: 0
                    }, i), r = o.axis, s = o.tension, a = o.closed, h = o.margin, l = o.max, c = r, d = new Set, u = i.arcLengths || b(e, i.arcDivisions || 300, {
                        tension: s,
                        closed: a
                    }), g = a ? e.length : e.length - 1, f = 0; f < g; f += 1) {
                        var p = l < 0 ? e.length - f : f, m = v(p, e, a), y = m[0], w = m[1], P = m[2], M = m[3],
                            S = void 0, D = void 0;
                        if (w[c] < P[c] ? (S = w[c], D = P[c]) : (S = P[c], D = w[c]), t - h <= D && t + h >= S) {
                            var T = C(t, s, y[c], w[c], P[c], M[c]);
                            l < 0 ? T.sort((function (t, e) {
                                return e - t
                            })) : l >= 0 && T.sort((function (t, e) {
                                return t - e
                            }));
                            for (var L = 0; L < T.length; L++) if (!(0 === T[L] && f > 0)) {
                                var _ = x((T[L] + p) / g, u);
                                if (d.add(_), d.size === Math.abs(l)) return Array.from(d)
                            }
                        }
                    }
                    return Array.from(d)
                }

                function D(t, e) {
                    void 0 === e && (e = {});
                    for (var i = n({
                        tension: .5,
                        closed: !1,
                        from: 0,
                        to: 1,
                        arcLengths: null,
                        arcDivisions: 300
                    }, e), o = i.tension, r = i.closed, a = i.from, l = i.to, u = i.arcLengths, g = i.arcDivisions, f = r ? t.length : t.length - 1, p = P(a, u = u || b(t, g, {
                        tension: o,
                        closed: r
                    })), m = P(l, u), w = Math.floor(f * p), x = Math.ceil(f * m), C = y(p, t, {
                        tension: o,
                        closed: r
                    }), M = y(m, t, {
                        tension: o,
                        closed: r
                    }), S = [], D = [], T = 0; T < C.length; T++) S[T] = Math.min(C[T], M[T]), D[T] = Math.max(C[T], M[T]);
                    for (var L = function (e) {
                        var n = v(e - 1, t, r), i = n[0], a = n[1], l = n[2], u = n[3];
                        if (e < x) for (var g = 0; g < l.length; g++) l[g] < S[g] && (S[g] = l[g]), l[g] > D[g] && (D[g] = l[g]);
                        if (o < 1) {
                            var y = f * p - (e - 1), b = f * m - (e - 1), P = function (t) {
                                return t > -s && t <= 1 + s && (e - 1 !== w || t > y) && (e !== x || t < b)
                            }, C = function (t) {
                                var e = c(i[t], a[t], l[t], u[t], 0, o);
                                h(3 * e[0], 2 * e[1], e[2]).filter(P).forEach((function (e) {
                                    var n = d(e, o, i[t], a[t], l[t], u[t]);
                                    n < S[t] && (S[t] = n), n > D[t] && (D[t] = n)
                                }))
                            };
                            for (g = 0; g < i.length; g++) C(g)
                        }
                    }, _ = w + 1; _ <= x; _++) L(_);
                    return {min: S, max: D}
                }

                var T = function () {
                    function t(t, e) {
                        void 0 === e && (e = {}), e = n({
                            tension: .5,
                            arcDivisions: 300,
                            closed: !1
                        }, e), this._cache = {}, this._tension = e.tension, this._arcDivisions = e.arcDivisions, this._lmargin = e.lmargin || 1 - this._tension, this._closed = e.closed, this.points = t
                    }

                    return t.prototype.getT = function (t) {
                        return P(t, this.arcLengths)
                    }, t.prototype.getPointAt = function (t, e) {
                        var n = {tension: this.tension, closed: this.closed};
                        return y(this.getT(t), this.points, n, e)
                    }, t.prototype.getTangentAt = function (t, e) {
                        return void 0 === e && (e = null), f(w(this.getT(t), this.points, {
                            tension: this.tension,
                            closed: this.closed
                        }, e))
                    }, t.prototype.getBoundingBox = function (t, e) {
                        if (void 0 === t && (t = 0), void 0 === e && (e = 1), 0 === t && 1 === e && this._cache.bbox) return this._cache.bbox;
                        var n = D(this.points, {
                            from: t,
                            to: e,
                            tension: this.tension,
                            closed: this.closed,
                            arcLengths: this.arcLengths
                        });
                        return 0 === t && 1 === e && (this._cache.bbox = n), n
                    }, t.prototype.getPoints = function (t, e, n, i) {
                        if (void 0 === t && (t = 100), void 0 === n && (n = 0), void 0 === i && (i = 1), !t || t <= 0) throw Error("Invalid arguments passed to getPoints(). You must specify at least 1 sample/segment.");
                        if (!(n < 0 || i > 1 || i < n)) {
                            for (var o = [], r = 0; r <= t; r++) {
                                var s = 0 === n && 1 === i ? r / t : n + r / t * (i - n);
                                o.push(this.getPointAt(s, e && new e))
                            }
                            return o
                        }
                    }, t.prototype.lookup = function (t, e, n, i) {
                        void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === i && (i = this._lmargin);
                        var o = M(t, this.points, {
                            axis: e,
                            tension: this.tension,
                            closed: this.closed,
                            max: n,
                            margin: i
                        });
                        return 1 === Math.abs(n) && 1 === o.length ? o[0] : o
                    }, t.prototype.lookupPositions = function (t, e, n, i) {
                        return void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === i && (i = this._lmargin), S(t, this.points, {
                            axis: e,
                            arcLengths: this.arcLengths,
                            tension: this.tension,
                            closed: this.closed,
                            max: n,
                            margin: i
                        })
                    }, t.prototype.invalidateCache = function () {
                        var t = this;
                        return Object.keys(this._cache).forEach((function (e) {
                            delete t._cache[e]
                        })), this
                    }, Object.defineProperty(t.prototype, "points", {
                        get: function () {
                            return this._points
                        }, set: function (t) {
                            this._points = t, this.invalidateCache()
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "tension", {
                        get: function () {
                            return this._tension
                        }, set: function (t) {
                            t !== this._tension && (this._tension = t, this.invalidateCache())
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "closed", {
                        get: function () {
                            return this._closed
                        }, set: function (t) {
                            t !== this._closed && (this._closed = t, this.invalidateCache())
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "arcDivisions", {
                        get: function () {
                            return this._arcDivisions
                        }, set: function (t) {
                            t !== this._arcDivisions && (this._arcDivisions = t, this.invalidateCache())
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "arcLengths", {
                        get: function () {
                            if (this._cache.arcLengths) return this._cache.arcLengths;
                            var t = b(this.points, this.arcDivisions, {tension: this.tension, closed: this.closed});
                            return this._cache.arcLengths = t, t
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "length", {
                        get: function () {
                            var t = this.arcLengths;
                            return t[t.length - 1]
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "minX", {
                        get: function () {
                            return this.getBoundingBox().min[0]
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "maxX", {
                        get: function () {
                            return this.getBoundingBox().max[0]
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "minY", {
                        get: function () {
                            return this.getBoundingBox().min[1]
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "maxY", {
                        get: function () {
                            return this.getBoundingBox().max[1]
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "minZ", {
                        get: function () {
                            return this.getBoundingBox().min[2]
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "maxZ", {
                        get: function () {
                            return this.getBoundingBox().max[2]
                        }, enumerable: !0, configurable: !0
                    }), t
                }(), L = function (t) {
                    function n(e, n, i, o) {
                        return void 0 === n && (n = .5), void 0 === i && (i = 300), void 0 === o && (o = !1), t.call(this, e, {
                            tension: n,
                            arcDivisions: i,
                            closed: o
                        }) || this
                    }

                    return function (t, n) {
                        function i() {
                            this.constructor = t
                        }

                        e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                    }(n, t), n.prototype.x = function (t, e, n) {
                        void 0 === e && (e = 0), void 0 === n && (n = this._lmargin);
                        var i = this.lookup(t, 1, e, n);
                        return 1 === Math.abs(e) ? i[0] : i.map((function (t) {
                            return t[0]
                        }))
                    }, n.prototype.y = function (t, e, n) {
                        void 0 === e && (e = 0), void 0 === n && (n = this._lmargin);
                        var i = this.lookup(t, 0, e, n);
                        return 1 === Math.abs(e) ? i[1] : i.map((function (t) {
                            return t[1]
                        }))
                    }, n.prototype.getNormalAt = function (t, e) {
                        return f(p(w(this.getT(t), this.points, {tension: this.tension, closed: this.closed}, e)))
                    }, n.prototype.getAngleAt = function (t) {
                        var e = w(this.getT(t), this.points, {tension: this.tension, closed: this.closed});
                        return Math.atan2(e[1], e[0])
                    }, n.prototype.getBoundingBox = function (e, n) {
                        void 0 === e && (e = 0), void 0 === n && (n = 1);
                        var i = t.prototype.getBoundingBox.call(this, e, n);
                        return {x1: i.min[0], x2: i.max[0], y1: i.min[1], y2: i.max[1], min: i.min, max: i.max}
                    }, n
                }(T), _ = function () {
                    function t(t, e, n, i) {
                        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === n && (n = null), void 0 === i && (i = null), this.x = t, this.y = e, this.z = n, this.w = i
                    }

                    return Object.defineProperty(t.prototype, 0, {
                        get: function () {
                            return this.x
                        }, set: function (t) {
                            this.x = t
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, 1, {
                        get: function () {
                            return this.y
                        }, set: function (t) {
                            this.y = t
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, 2, {
                        get: function () {
                            return this.z
                        }, set: function (t) {
                            this.z = t
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, 3, {
                        get: function () {
                            return this.w
                        }, set: function (t) {
                            this.w = t
                        }, enumerable: !0, configurable: !0
                    }), Object.defineProperty(t.prototype, "length", {
                        get: function () {
                            return Number.isFinite(this.w) ? 4 : Number.isFinite(this.z) ? 3 : 2
                        }, enumerable: !0, configurable: !0
                    }), t
                }();
                t.CurveInterpolator = T, t.CurveInterpolator2D = L, t.EPS = s, t.Point = _, t.clamp = m, t.distance = g, t.fill = i, t.getArcLengths = b, t.getBoundingBox = D, t.getCoefficients = c, t.getCubicRoots = l, t.getDerivativeOfT = u, t.getPointAtT = y, t.getQuadRoots = h, t.getTAtValue = C, t.getTangentAtT = w, t.getTtoUmapping = x, t.getUtoTmapping = P, t.map = o, t.normalize = f, t.orthogonal = p, t.positionsLookup = S, t.reduce = r, t.simplify2d = function (t, e, n) {
                    var i;
                    if (void 0 === e && (e = .001), void 0 === n && (n = 10), t.length <= 4) return t;
                    for (var o = t[0], r = o[0], s = o[1], a = t.map((function (t) {
                        return [t[0] - r, t[1] - s]
                    })), h = a[0], l = h[0], c = h[1], d = [t[0]], u = 1; u + 1 < a.length; u++) {
                        var g = a[u], f = g[0], p = g[1], m = a[u + 1], v = m[0], y = m[1];
                        if (v - f != 0 || y - p != 0) {
                            var w = Math.abs(l * y - c * v + v * p - y * f + c * f - l * p) / Math.sqrt(Math.pow(v - l, 2) + Math.pow(y - c, 2)),
                                b = [l - f, c - p], P = Math.sqrt(Math.pow(b[0], 2) + Math.pow(b[1], 2));
                            (w > e || P >= n) && (d.push([f + r, p + s]), l = (i = [f, p])[0], c = i[1])
                        }
                    }
                    var x = a[a.length - 1];
                    return d.push([x[0] + r, x[1] + s]), d
                }, t.solveForT = d, t.tangentsLookup = function (t, e, i) {
                    return M(t, e, n(n({}, i), {func: u, processRefAxis: !0}))
                }, t.valuesLookup = M, Object.defineProperty(t, "__esModule", {value: !0})
            }(e)
        }, 401: function (t, e, n) {
            "use strict";
            n.r(e), e.default = '<!DOCTYPE html>\n<html>\n<head>\n    \x3c!-- HTML Codes by Quackit.com --\x3e\n    <title>\n        Contact</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n<h1>Contact Frederik Schlüter</h1>\n<p>Telephone: +33(0)6 08 43 87 09</p>\n<p>Email: f.schlueter@posteo.de</p>\n<p>LinkedIn: https://www.linkedin.com/in/frederik-schl%C3%BCter-11311b145/?locale=fr_FR </p>\n<p>Github: https://github.com/fleanegan/</p>\n<h2><img src="contactCode.png" alt="Contact Informations as QR Code" width="512" height="512"/></h2>\n\n</body>\n</html>\n</body>\n</html>'
        }, 843: function (t, e, n) {
            "use strict";
            n.r(e), e.default = '<!DOCTYPE html>\n<html>\n<head>\n    \x3c!-- HTML Codes by Quackit.com --\x3e\n    <title>\n        Building Lamps</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n<h1>Building Lamps</h1>\n</body>\n</html>\n</body>\n</html>'
        }, 509: function (t, e, n) {
            "use strict";
            n.r(e), e.default = '<!DOCTYPE html>\n<html>\n<head>\n    \x3c!-- HTML Codes by Quackit.com --\x3e\n    <title>\n        Programming</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n<h1>Programming</h1>\n</body>\n</html>\n</body>\n</html>'
        }, 957: function (t, e, n) {
            "use strict";
            n.r(e), e.default = '<!DOCTYPE html>\n<html>\n<head>\n    \x3c!-- HTML Codes by Quackit.com --\x3e\n    <title>\n        Mechanical Engineering</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n<h1>Mechanical Engineering</h1>\n</body>\n</html>\n</body>\n</html>'
        }, 31: function (t, e, n) {
            "use strict";
            n.r(e), e.default = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Mentions Légales</title>\n</head>\n<body>\n\n\n<p><strong>\x3c!-- #######  HEY, I AM THE SOURCE EDITOR! #########--\x3e</strong></p>\n<h1>Mentions L&eacute;gales</h1>\n<h2>&Eacute;diteur</h2>\nFrederik Schlüter<br/>\n59 rue Barrault France<br/>\n75013 Paris<br/>\nTél : +33(0)6 08 43 87 09<br/>\n<h2>H&eacute;bergeur</h2>\n<p>GitHub Inc <br />88 Colin P Kelly Jr Street<br />San Francisco, CA 94107 <br />United States ; <br /><a href=\"http://www.github.com\">www.github.com </a></p>\n<h2>Utilisation des donn&eacute;es et Copyright</h2>\n<p>Ce site est destin&eacute; qu'&agrave; des fins informatifs. <br/>L'utilisation du site web se fait sous la responsabilit&eacute; du visiteur.<br/> Aucune responsabilit&eacute; n'est engag&eacute;e pour d'&eacute;ventuels risques techniques aussi peu probable qu'il soient.</p>\n<h2>Qui est responsable de vos donn&eacute;es ?</h2>\n<p>Ce site web n'enregistre aucune donn&eacute;e. Cependant, il est possible que l'H&eacute;bergeur<br/> (github) collecte des donn&eacute;es sur les utilisateurs. &nbsp;</p>\n<h2>Contributeurs</h2>\nLe site utilise les bibliothèques suivantes:<br/>\ncss-loader<br/>\nfile-loader<br/>\nhtml-webpack-plugin<br/>\njest<br/>\nraw-loader<br/>\nstyle-loader<br/>\nts-loader<br/>\nts-node-dev<br/>\nurl-loader<br/>\nwebpack<br/>\ncanvas<br/>\ncurve-interpolator<br/>\nparcel<br/>\ntypescript<br/>\n</body>\n</html>"
        }, 118: function (t, e, n) {
            "use strict";
            n.r(e);
            var i = n(379), o = n.n(i), r = n(795), s = n.n(r), a = n(569), h = n.n(a), l = n(565), c = n.n(l),
                d = n(216), u = n.n(d), g = n(589), f = n.n(g), p = n(556), m = {};
            m.styleTagTransform = f(), m.setAttributes = c(), m.insert = h().bind(null, "head"), m.domAPI = s(), m.insertStyleElement = u(), o()(p.Z, m), e.default = p.Z && p.Z.locals ? p.Z.locals : void 0
        }, 644: function (t, e, n) {
            "use strict";
            n.r(e);
            var i = n(379), o = n.n(i), r = n(795), s = n.n(r), a = n(569), h = n.n(a), l = n(565), c = n.n(l),
                d = n(216), u = n.n(d), g = n(589), f = n.n(g), p = n(399), m = {};
            m.styleTagTransform = f(), m.setAttributes = c(), m.insert = h().bind(null, "head"), m.domAPI = s(), m.insertStyleElement = u(), o()(p.Z, m), e.default = p.Z && p.Z.locals ? p.Z.locals : void 0
        }, 379: function (t) {
            "use strict";
            var e = [];

            function n(t) {
                for (var n = -1, i = 0; i < e.length; i++) if (e[i].identifier === t) {
                    n = i;
                    break
                }
                return n
            }

            function i(t, i) {
                for (var r = {}, s = [], a = 0; a < t.length; a++) {
                    var h = t[a], l = i.base ? h[0] + i.base : h[0], c = r[l] || 0, d = "".concat(l, " ").concat(c);
                    r[l] = c + 1;
                    var u = n(d), g = {css: h[1], media: h[2], sourceMap: h[3], supports: h[4], layer: h[5]};
                    if (-1 !== u) e[u].references++, e[u].updater(g); else {
                        var f = o(g, i);
                        i.byIndex = a, e.splice(a, 0, {identifier: d, updater: f, references: 1})
                    }
                    s.push(d)
                }
                return s
            }

            function o(t, e) {
                var n = e.domAPI(e);
                return n.update(t), function (e) {
                    if (e) {
                        if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap && e.supports === t.supports && e.layer === t.layer) return;
                        n.update(t = e)
                    } else n.remove()
                }
            }

            t.exports = function (t, o) {
                var r = i(t = t || [], o = o || {});
                return function (t) {
                    t = t || [];
                    for (var s = 0; s < r.length; s++) {
                        var a = n(r[s]);
                        e[a].references--
                    }
                    for (var h = i(t, o), l = 0; l < r.length; l++) {
                        var c = n(r[l]);
                        0 === e[c].references && (e[c].updater(), e.splice(c, 1))
                    }
                    r = h
                }
            }
        }, 569: function (t) {
            "use strict";
            var e = {};
            t.exports = function (t, n) {
                var i = function (t) {
                    if (void 0 === e[t]) {
                        var n = document.querySelector(t);
                        if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                            n = n.contentDocument.head
                        } catch (t) {
                            n = null
                        }
                        e[t] = n
                    }
                    return e[t]
                }(t);
                if (!i) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                i.appendChild(n)
            }
        }, 216: function (t) {
            "use strict";
            t.exports = function (t) {
                var e = document.createElement("style");
                return t.setAttributes(e, t.attributes), t.insert(e, t.options), e
            }
        }, 565: function (t, e, n) {
            "use strict";
            t.exports = function (t) {
                var e = n.nc;
                e && t.setAttribute("nonce", e)
            }
        }, 795: function (t) {
            "use strict";
            t.exports = function (t) {
                var e = t.insertStyleElement(t);
                return {
                    update: function (n) {
                        !function (t, e, n) {
                            var i = "";
                            n.supports && (i += "@supports (".concat(n.supports, ") {")), n.media && (i += "@media ".concat(n.media, " {"));
                            var o = void 0 !== n.layer;
                            o && (i += "@layer".concat(n.layer.length > 0 ? " ".concat(n.layer) : "", " {")), i += n.css, o && (i += "}"), n.media && (i += "}"), n.supports && (i += "}");
                            var r = n.sourceMap;
                            r && "undefined" != typeof btoa && (i += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")), e.styleTagTransform(i, t, e.options)
                        }(e, t, n)
                    }, remove: function () {
                        !function (t) {
                            if (null === t.parentNode) return !1;
                            t.parentNode.removeChild(t)
                        }(e)
                    }
                }
            }
        }, 589: function (t) {
            "use strict";
            t.exports = function (t, e) {
                if (e.styleSheet) e.styleSheet.cssText = t; else {
                    for (; e.firstChild;) e.removeChild(e.firstChild);
                    e.appendChild(document.createTextNode(t))
                }
            }
        }, 621: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.AnimationNudge = e.CustomAnimation = e.Mode = void 0;
            const i = n(190), o = n(114), r = n(755);
            var s;
            !function (t) {
                t[t.Loop = 0] = "Loop", t[t.Normal = 1] = "Normal", t[t.Paused = 2] = "Paused"
            }(s = e.Mode || (e.Mode = {}));

            class a {
                constructor(t, e = s.Normal) {
                    this.durationInMs = t, this.mode = e, this.lastTimeStamp = 0, this.timeStampOnStartInMs = 0, this._isActivated = !1
                }

                run(t, e) {
                    if (!1 !== this._isActivated) if (this.mode === s.Normal) this.lastTimeStamp = (t - this.timeStampOnStartInMs) / this.durationInMs, this.lastTimeStamp > 1 && (this.lastTimeStamp = 1, this._isActivated = !0); else if (this.mode === s.Loop) {
                        const e = (t - this.timeStampOnStartInMs) % this.durationInMs;
                        this.lastTimeStamp = 2 * e / this.durationInMs, e > this.durationInMs / 2 && (this.lastTimeStamp = 2 - this.lastTimeStamp)
                    }
                }

                getProgress() {
                    return this.lastTimeStamp
                }

                activate(t) {
                    this.timeStampOnStartInMs = t, this._isActivated = !0
                }

                isActivated() {
                    return this._isActivated
                }

                deactivate() {
                    this._isActivated = !1
                }
            }

            e.CustomAnimation = a, e.AnimationNudge = class extends a {
                constructor(t, e, n, r, a = s.Normal) {
                    super(n, a), this.start = t, this.end = e, this.message = r, this.currentPoint = new i.Point(0, 0), this.obj = new o.DragItem(t, {
                        strokeColor: "#ff0000",
                        fillColor: "#000000",
                        lineWidth: 5
                    })
                }

                run(t, e) {
                    this.isActivated() && (super.run(t), this.currentPoint.x = this.start.x + Math.round((this.end.x - this.start.x) * this.getProgress()), this.currentPoint.y = this.start.y + Math.round((this.end.y - this.start.y) * this.getProgress()), this.obj.setCenter(this.currentPoint), this.obj.draw(e), e.font = 20 * r.Scaler.xLimited(1, .75, 3) + "px monospace", e.fillText(this.message, this.end.x - 64, this.end.y + 32))
                }
            }
        }, 114: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Rails = e.Path = e.drawBackground = e.DragItem = e.HighlightMode = void 0;
            const i = n(945), o = n(190), r = n(755), s = n(472);
            var a;
            !function (t) {
                t[t.None = 0] = "None", t[t.Light = 1] = "Light", t[t.Full = 2] = "Full"
            }(a = e.HighlightMode || (e.HighlightMode = {}));

            class h extends s.GameObject {
                constructor(t, e, n, i) {
                    super(t), this.normalStyle = e, this.hightlightStyle = n, this.highlightStyle2 = i, this.isHightlighted = a.None
                }

                draw(t) {
                    const e = Math.min(r.Scaler.xLimited(h.radius, 12, 20), r.Scaler.yLimited(h.radius, 12, 20)),
                        n = this.getStyle();
                    t.beginPath(), t.shadowBlur = 0, t.globalAlpha = .5, t.arc(this.center.x, this.center.y, e, 0, 2 * Math.PI, !1), t.fillStyle = n.fillColor, t.fill(), t.lineWidth = n.lineWidth, t.globalAlpha = 1, t.strokeStyle = n.strokeColor, t.stroke()
                }

                getStyle() {
                    return this.isHightlighted == a.Light ? this.hightlightStyle : this.isHightlighted == a.Full ? this.highlightStyle2 : this.normalStyle
                }
            }

            e.DragItem = h, h.radius = 32, e.drawBackground = function (t, e) {
                t.fillStyle = "#ccd5ae", t.beginPath(), t.fillRect(0, 0, e.width + window.innerWidth, e.height + window.innerHeight), t.stroke()
            };

            class l {
                constructor() {
                }

                pxToNormalized(t) {
                    return t / this.interpolator.length
                }

                interpolate(t) {
                    this.basePoints = t, this.interpolator = new i.CurveInterpolator(t, {
                        tension: 0,
                        closed: !0
                    }), this.points = this.interpolator.getPoints(this.interpolator.length)
                }

                getPoints() {
                    return this.points
                }
            }

            function c(t, e, n) {
                let i, o = e.at(1);
                for (t.beginPath(), t.moveTo(o[0], o[1]), i = 0; i < e.length; i++) {
                    let n = e.at(i);
                    t.lineTo(n[0], n[1])
                }
                t.strokeStyle = n.strokeColor, t.lineWidth = n.lineWidth, n.shadowBlur ? (t.shadowBlur = n.shadowBlur, t.shadowColor = n.shadowColor, t.shadowOffsetY = n.shadowOffsetY, t.shadowOffsetX = n.shadowOffsetX) : (t.shadowBlur = 0, t.shadowOffsetY = 0, t.shadowOffsetX = 0), t.closePath(), t.stroke()
            }

            e.Path = l, e.Rails = class {
                constructor(t) {
                    this.splineBasePoints = [], this.shouldRedrawDraggable = !1, t.forEach((t => {
                        const e = r.Scaler.x(t[0]), n = r.Scaler.y(t[1]);
                        this.splineBasePoints.push(new h(new o.Point(e, n), {
                            strokeColor: "#ffffff",
                            fillColor: "#ffffff",
                            lineWidth: 5
                        }))
                    })), this.path = new l
                }

                reDraw(t) {
                    this.drawRails(t), this.splineBasePoints.forEach((e => {
                        e.draw(t)
                    }))
                }

                draw(t) {
                    this.shouldRedrawRails && (this.drawRails(t), this.splineBasePoints.forEach((e => {
                        e.draw(t)
                    }))), this.shouldRedrawDraggable && this.splineBasePoints.forEach((e => {
                        e.draw(t)
                    }))
                }

                drawRails(t) {
                    let e = r.Scaler.xLimited(1), n = (0, o.generateOffsetCurveNegative)(this.path.getPoints(), 10 * e),
                        i = (0, o.generateOffsetCurvePositive)(this.path.getPoints(), 10 * e);
                    c(t, this.path.getPoints(), {
                        strokeColor: "#d4a373",
                        fillColor: "#ffffff",
                        lineWidth: 45 * e,
                        shadowBlur: 2 * e,
                        shadowColor: "#B7BF9C",
                        shadowOffsetX: 5 * e,
                        shadowOffsetY: 5 * e
                    });
                    for (let o = 1; o < n.length; o++) o % Math.floor(20 * e) == 0 && c(t, [n[o], i[o]], {
                        strokeColor: "#faedcd",
                        fillColor: "#ffffff",
                        lineWidth: 10 * e,
                        shadowBlur: 2 * e,
                        shadowColor: "#4a4e69",
                        shadowOffsetX: 1 * e,
                        shadowOffsetY: 1 * e
                    });
                    c(t, n, {
                        strokeColor: "#432818",
                        fillColor: "#ffffff",
                        lineWidth: 5 * e,
                        shadowBlur: 2 * e,
                        shadowColor: "#4a4e69",
                        shadowOffsetX: 1 * e,
                        shadowOffsetY: 1 * e
                    }), c(t, i, {
                        strokeColor: "#432818",
                        fillColor: "#ffffff",
                        lineWidth: 5 * e,
                        shadowBlur: 2 * e,
                        shadowColor: "#4a4e69",
                        shadowOffsetX: 1 * e,
                        shadowOffsetY: 1 * e
                    }), this.shouldRedrawRails = !1
                }
            }
        }, 948: function (t, e, n) {
            "use strict";
            var i = this && this.__awaiter || function (t, e, n, i) {
                return new (n || (n = Promise))((function (o, r) {
                    function s(t) {
                        try {
                            h(i.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }

                    function a(t) {
                        try {
                            h(i.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }

                    function h(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n((function (t) {
                            t(e)
                        }))).then(s, a)
                    }

                    h((i = i.apply(t, e || [])).next())
                }))
            }, o = this && this.__importDefault || function (t) {
                return t && t.__esModule ? t : {default: t}
            };
            Object.defineProperty(e, "__esModule", {value: !0}), e.ContentTile = e.ContentPreview = void 0;
            const r = n(114), s = n(190), a = n(472), h = o(n(982)), l = o(n(140)), c = o(n(713)), d = o(n(957)),
                u = o(n(843)), g = o(n(509)), f = n(755);
            var p;
            !function (t) {
                t[t.LowerLeft = 0] = "LowerLeft", t[t.UpperLeft = 1] = "UpperLeft", t[t.UpperRight = 2] = "UpperRight"
            }(p || (p = {})), e.ContentPreview = class {
                constructor() {
                    this.targets = [new m(new s.Point(f.Scaler.x(m.diameter / 4), f.Scaler.getHeight() - f.Scaler.y(m.diameter / 4)), c.default, u.default, p.LowerLeft), new m(new s.Point(f.Scaler.getWidth() / 2 - f.Scaler.x(m.diameter / 2), f.Scaler.y(m.diameter / 2)), l.default, g.default, p.UpperRight), new m(new s.Point(f.Scaler.getWidth() / 1.3 - f.Scaler.x(m.diameter / 2), .5 * f.Scaler.getHeight()), h.default, d.default, p.UpperLeft)]
                }

                draw(t) {
                    return i(this, void 0, void 0, (function* () {
                        for (const e of this.targets) yield e.draw(t)
                    }))
                }

                updateZoom() {
                    this.targets.forEach((t => {
                        t.updateZoom()
                    }))
                }

                setTargetHightlightMode(t) {
                    this.targets.forEach((e => {
                        e.setHightlightMode(t)
                    }))
                }

                getTargetsUnderPointer(t) {
                    for (const e of this.targets) if (e.getDragTargetCenter().distanceTo(t) < 2 * r.DragItem.radius) return [e];
                    return []
                }

                getTileUnderPointer(t) {
                    for (const e of this.targets) if (e.isPointOnTile(t)) return [e];
                    return []
                }

                drawTargets(t) {
                    this.targets.forEach((e => {
                        e.dragTarget.draw(t)
                    }))
                }
            };

            class m extends a.GameObject {
                constructor(t, e, n, i) {
                    i === p.LowerLeft && (t.y -= f.Scaler.y(m.diameter)), i === p.UpperRight && (t.x -= f.Scaler.x(m.diameter)), super(t), this.imgSrc = e, this.contentHtml = n, this.referencePointMode = i, this.scaleFactor = 1, this.img = new Image, this.img.src = e;
                    let o = new s.Point(0, 0);
                    this.dragTarget = new r.DragItem(o, {
                        strokeColor: "#ffffff",
                        fillColor: "#ffffff",
                        lineWidth: 5
                    }, {strokeColor: "#ff0000", fillColor: "#ffffff", lineWidth: 5}, {
                        strokeColor: "#ff0000",
                        fillColor: "#ff0000",
                        lineWidth: 5,
                        shadowBlur: 10,
                        shadowColor: "#ff0000",
                        shadowOffsetX: 0,
                        shadowOffsetY: 0
                    }), this.updateZoom()
                }

                setHightlightMode(t) {
                    this.dragTarget.isHightlighted = t
                }

                getDragTargetCenter() {
                    return this.dragTarget.center
                }

                updateZoom() {
                    super.updateZoom(), this.scaleFactor = m.calculateScaleFactor(), this.moveIntoVisibleCanvas(), this.dragTarget.setCenter(new s.Point(this.center.x + m.diameter * this.scaleFactor * .175, this.center.y + m.diameter * this.scaleFactor * .375))
                }

                static calculateScaleFactor() {
                    const t = Math.min(f.Scaler.x(1), f.Scaler.y(1));
                    let e;
                    return e = m.diameter * t < m.minDiameter ? m.minDiameter / m.diameter : m.diameter * t > m.maxDiameter ? m.maxDiameter / m.diameter : t, e
                }

                isPointOnTile(t) {
                    return new s.Point(this.center.x + m.diameter * this.scaleFactor / 2, this.center.y + m.diameter * this.scaleFactor / 2).distanceTo(t) < this.scaleFactor * m.diameter / 2
                }

                moveIntoVisibleCanvas() {
                    for (; this.center.x + m.diameter * this.scaleFactor > f.Scaler.getWidth();) this.center.x--;
                    for (; this.center.x < 0;) this.center.x++;
                    for (; this.center.y + m.diameter * this.scaleFactor > f.Scaler.getHeight();) this.center.y--;
                    for (; this.center.y < 0;) this.center.y++
                }

                draw(t) {
                    return i(this, void 0, void 0, (function* () {
                        const e = this.center.x, n = this.center.y, i = this.scaleFactor * m.diameter,
                            o = this.scaleFactor * m.diameter;
                        this.dragTarget.draw(t), yield new Promise((t => {
                            this.img.onload = t, this.img.src = this.imgSrc
                        })), t.drawImage(this.img, e, n, i, o)
                    }))
                }

                getContent() {
                    return this.contentHtml
                }
            }

            e.ContentTile = m, m.diameter = 400, m.minDiameter = 128, m.maxDiameter = 768
        }, 305: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.DetailedContentView = void 0;
            const i = n(755);
            e.DetailedContentView = class {
                constructor() {
                    this.elements = [], this.createBlurryOverlay(), this.createBox(), this.hide()
                }

                createBlurryOverlay() {
                    let t = document.createElement("div");
                    t.setAttribute("class", "blur"), document.body.appendChild(t), t.addEventListener("click", (() => {
                        this.hide()
                    })), this.elements.push(t)
                }

                createBox() {
                    let t = document.createElement("div");
                    t.setAttribute("id", "ModalBox"), t.setAttribute("class", "ModalBox");
                    let e = document.createElement("button"), n = document.createTextNode("X");
                    e.appendChild(n), e.id = "btn", e.setAttribute("class", "modalCloseButton"), t.appendChild(e), e.addEventListener("click", (() => {
                        this.hide()
                    })), i.Scaler.getWidth() <= 650 && (t.style.minWidth = "100%"), document.body.appendChild(t), t.parentElement.style.display = "flex", t.parentElement.style.justifyContent = "center", this.elements.push(t)
                }

                isHidden() {
                    return this.isHiddenFlag
                }

                hide() {
                    this.elements.forEach((t => {
                        t.style.display = "none"
                    })), this.isHiddenFlag = !0
                }

                show() {
                    this.elements.forEach((t => {
                        t.style.display = "block"
                    })), this.isHiddenFlag = !1
                }

                setContent(t) {
                    const e = document.getElementById("ModalBox");
                    let n = document.getElementById("modalInnerHtml");
                    n && n.remove();
                    let i = document.createElement("content");
                    if (i.setAttribute("class", "modalContent"), i.setAttribute("id", "modalInnerHtml"), !e) throw new Error("could not find DOM");
                    e.appendChild(i), i.insertAdjacentHTML("beforeend", t)
                }
            }
        }, 210: function (t, e, n) {
            "use strict";
            var i = this && this.__awaiter || function (t, e, n, i) {
                return new (n || (n = Promise))((function (o, r) {
                    function s(t) {
                        try {
                            h(i.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }

                    function a(t) {
                        try {
                            h(i.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }

                    function h(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n((function (t) {
                            t(e)
                        }))).then(s, a)
                    }

                    h((i = i.apply(t, e || [])).next())
                }))
            }, o = this && this.__importDefault || function (t) {
                return t && t.__esModule ? t : {default: t}
            };
            Object.defineProperty(e, "__esModule", {value: !0});
            const r = n(406), s = n(190), a = n(755), h = n(305), l = o(n(31)), c = o(n(401)), d = n(35);
            e.default = class {
                constructor() {
                    this.height = a.Scaler.getHeight(), this.width = a.Scaler.getWidth(), this.drawingState = {
                        pointerPosition: {
                            x: 0,
                            y: 0
                        }, isPointerDown: !1, pressedKeys: new Set
                    }, this.canvas = document.getElementById("canvas"), this.canvas.width = this.width, this.canvas.height = this.height, this.context = this.canvas.getContext("2d"), this.addEventListeners(), this.detailedContentView = new h.DetailedContentView, this.logic = new r.Logic
                }

                getMousePos(t) {
                    const e = this.canvas.getBoundingClientRect();
                    return {
                        x: (t.clientX - e.left) / (e.right - e.left) * this.canvas.width,
                        y: (t.clientY - e.top) / (e.bottom - e.top) * this.canvas.height
                    }
                }

                addEventListeners() {
                    this.canvas.addEventListener("pointerdown", (t => {
                        const {x: e, y: n} = this.getMousePos(t);
                        this.drawingState.pointerPosition.x = e, this.drawingState.pointerPosition.y = n, this.drawingState.isPointerDown = !0, this.logic.handlePointerDown(new s.Point(e, n));
                        const i = t.target;
                        i.hasPointerCapture(t.pointerId) && i.releasePointerCapture(t.pointerId)
                    })), this.canvas.addEventListener("pointerup", (t => {
                        const {x: e, y: n} = this.getMousePos(t);
                        this.drawingState.pointerPosition.x = e, this.drawingState.pointerPosition.y = n, this.drawingState.isPointerDown = !1, this.drawingState.pressedKeys.delete("ForwardButton"), this.logic.handlePointerUp(new s.Point(e, n))
                    })), this.canvas.addEventListener("pointermove", (t => {
                        const {x: e, y: n} = this.getMousePos(t);
                        this.drawingState.pointerPosition.x = e, this.drawingState.pointerPosition.y = n, this.drawingState.isPointerDown && this.logic.handlePointerPressedMove(new s.Point(e, n))
                    })), document.addEventListener("keydown", (t => {
                        this.drawingState.pressedKeys.add(t.key), "Escape" === t.key && this.detailedContentView.hide()
                    })), document.addEventListener("keyup", (t => {
                        this.drawingState.pressedKeys.delete(t.key)
                    })), window.addEventListener("resize", (() => {
                        this.canvas.width = a.Scaler.getWidth(), this.canvas.height = a.Scaler.getHeight(), this.logic.zoom()
                    })), document.getElementById("forwardButton").addEventListener("pointerdown", (() => {
                        this.drawingState.pressedKeys.add("ForwardButton")
                    })), document.getElementById("forwardButton").addEventListener("pointerup", (() => {
                        this.drawingState.pressedKeys.delete("ForwardButton")
                    })), document.getElementById("forwardButton").addEventListener("contextmenu", (function (t) {
                        t.preventDefault()
                    }))
                }

                render() {
                    let t = d.Direction.Idle;
                    this.drawingState.pressedKeys.has("ForwardButton") || this.drawingState.pressedKeys.has("ArrowRight") ? t = d.Direction.Forward : this.drawingState.pressedKeys.has("ArrowLeft") && (t = d.Direction.Backwards), this.logic.process(t)
                }

                setUpClickable(t, e) {
                    const n = document.getElementById(t), i = this;
                    n.onclick = function () {
                        i.detailedContentView.setContent(e), i.detailedContentView.show()
                    }
                }

                init() {
                    return i(this, void 0, void 0, (function* () {
                        this.setUpClickable("legalLink", l.default), this.setUpClickable("contactLink", c.default), this.setUpClickable("titleLink", c.default), yield this.logic.init(this.detailedContentView)
                    }))
                }
            }
        }, 472: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.GameObject = void 0;
            const i = n(190), o = n(755);
            e.GameObject = class {
                constructor(t) {
                    this.center = t, this.unScaledCenter = new i.Point(t.x / o.Scaler.x(1), t.y / o.Scaler.y(1))
                }

                setCenter(t) {
                    this.center = t, this.center.x, this.center.y, this.unScaledCenter.x = t.x / o.Scaler.x(1), this.unScaledCenter.y = t.y / o.Scaler.y(1)
                }

                updateZoom() {
                    this.center.x = o.Scaler.x(this.unScaledCenter.x), this.center.y = o.Scaler.y(this.unScaledCenter.y)
                }
            }
        }, 35: function (t, e, n) {
            "use strict";
            var i = this && this.__importDefault || function (t) {
                return t && t.__esModule ? t : {default: t}
            };
            Object.defineProperty(e, "__esModule", {value: !0}), e.Locomotive = e.Direction = void 0;
            const o = n(190), r = i(n(488));
            var s;
            !function (t) {
                t[t.Backwards = -1] = "Backwards", t[t.Idle = 0] = "Idle", t[t.Forward = 1] = "Forward", t[t.Auto = 2] = "Auto"
            }(s = e.Direction || (e.Direction = {})), e.Locomotive = class {
                constructor(t, e) {
                    this.path = t, this.length = e, this.trainProgress = .12, this.oldTrainProgress = this.trainProgress, this.velocity = 0, this.autopilotVelocity = 0, this.autopilotDestinationAsProgress = null, this.direction = s.Idle, this.img = new Image, this.img.src = r.default
                }

                hasReachedDestination() {
                    let t, e;
                    return null === this.autopilotDestinationAsProgress || (this.velocity < 0 ? (e = this.truncateNormalizedPathLength(this.trainProgress + this.velocity + this.getTrainLengthAsNormalizedPathLength()), t = this.truncateNormalizedPathLength(this.oldTrainProgress + this.getTrainLengthAsNormalizedPathLength())) : (t = this.truncateNormalizedPathLength(this.oldTrainProgress), e = this.truncateNormalizedPathLength(this.trainProgress + this.velocity)), this.velocity < 0 && t < e && (e -= 1), this.velocity > 0 && t > e && (t -= 1), t < this.autopilotDestinationAsProgress != e < this.autopilotDestinationAsProgress)
                }

                move() {
                    this.direction === s.Auto ? Math.abs(this.velocity) <= Math.abs(this.autopilotVelocity) && (this.velocity += .001 * Math.sign(this.autopilotVelocity)) : s.Idle === this.direction ? this.velocity *= .95 : Math.abs(this.velocity) <= .003 && (this.velocity += 25e-5 * this.direction);
                    let t = this.trainProgress + this.velocity;
                    this.oldTrainProgress = this.trainProgress, this.trainProgress = this.truncateNormalizedPathLength(t)
                }

                setDestination(t) {
                    this.autopilotDestinationAsProgress = (0, o.getIndexOfClosestValue)(t, this.path.getPoints()) / this.path.getPoints().length;
                    let e = this.autopilotDestinationAsProgress - this.trainProgress;
                    0 != e && (e > .5 && (e -= 1), e < -.5 && (e += 1), this.autopilotVelocity = e / 10)
                }

                calcAxlePositions() {
                    let t = [], e = this.calcIndexRearWheels(), n = o.Point.fromArr(this.path.getPoints()[e]),
                        i = this.indexOfFrontWheelsForStraightLine(e, .3),
                        r = o.Point.fromArr(this.path.getPoints()[i]);
                    for (; r.distanceTo(n) < .3 * this.length && i < this.path.getPoints().length;) r.x = this.path.getPoints()[i][0], r.y = this.path.getPoints()[i][1], i++;
                    return t.push(n), t.push(r), t
                }

                calcIndexRearWheels() {
                    let t = this.truncateNormalizedPathLength(this.trainProgress + this.getTrainLengthAsNormalizedPathLength());
                    return Math.round(t * this.path.getPoints().length)
                }

                indexOfFrontWheelsForStraightLine(t, e) {
                    let n = Math.round(this.path.pxToNormalized(this.length) * this.path.interpolator.length * e);
                    return n += t, n >= this.path.getPoints().length && (n -= this.path.getPoints().length), n
                }

                draw(t) {
                    let e = this.calcAxlePositions(), n = Math.atan2(e[1].y - e[0].y, e[1].x - e[0].x),
                        i = Math.round(this.img.height * this.length / this.img.width);
                    t.translate(e[0].x, e[0].y), t.rotate(n), t.drawImage(this.img, .25 * -this.length, -i / 2, this.length, i), t.rotate(-n), t.translate(-e[0].x, -e[0].y)
                }

                scaleLength(t) {
                    this.length = Math.round(175 * t)
                }

                truncateNormalizedPathLength(t) {
                    let e = t;
                    return e < 0 && (e += 1), e >= 1 && (e -= 1), e
                }

                getTrainLengthAsNormalizedPathLength() {
                    return this.path.pxToNormalized(this.length)
                }

                setDirection(t) {
                    this.direction = t
                }

                stop() {
                    this.autopilotVelocity = 0, this.autopilotDestinationAsProgress = null, this.velocity = 0, this.direction = s.Idle
                }
            }
        }, 406: function (t, e, n) {
            "use strict";
            var i = this && this.__awaiter || function (t, e, n, i) {
                return new (n || (n = Promise))((function (o, r) {
                    function s(t) {
                        try {
                            h(i.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }

                    function a(t) {
                        try {
                            h(i.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }

                    function h(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n((function (t) {
                            t(e)
                        }))).then(s, a)
                    }

                    h((i = i.apply(t, e || [])).next())
                }))
            };
            Object.defineProperty(e, "__esModule", {value: !0}), e.Logic = void 0;
            const o = n(114), r = n(35), s = n(190), a = n(755), h = n(34), l = n(948), c = n(621);
            e.Logic = class {
                constructor() {
                    this.animations = [], this.cycleCount = 0
                }

                init(t) {
                    return i(this, void 0, void 0, (function* () {
                        this.canvas = document.getElementById("canvas"), this.context = this.canvas.getContext("2d"), this.detailedContentView = t, this.rails = new o.Rails([[1500.4928366762176, 147.263644773358], [218.0859598853868, 98.17576318223868], [233.63027113720958, 454.75211344326783], [732.298728249195, 591.3103282673394], [806.6857356636901, 965.1881591448949], [1445.8629845586108, 978.4462382540282], [1957.666485605649, 785.3950413223142]]), this.contentPreview = new l.ContentPreview, this.railInteractivityHandler = new h.RailInteractivityHandler(this.rails, this.contentPreview), this.locomotive = new r.Locomotive(this.rails.path, 175 * a.Scaler.xLimited(1)), yield this.generateStaticBackground()
                    }))
                }

                animate() {
                    let t = this.rails.splineBasePoints[3].center;
                    const e = new s.Point(t.x - 12, t.y + 12);
                    t = new s.Point(e.x + 24, e.y - 24);
                    const n = this.contentPreview.targets[1].getDragTargetCenter(), i = new s.Point(n.x - 25, n.y + 25);
                    0 === this.animations.length ? (this.animations.push(new c.AnimationNudge(t, e, 5e3, "Drag me!", c.Mode.Loop)), this.animations.push(new c.AnimationNudge(n, i, 1e4, "Click me!", c.Mode.Loop)), this.animations[0].activate((new Date).getTime()), this.animations[1].activate((new Date).getTime()), this.animations[1].deactivate()) : this.animations.forEach((t => {
                        t.isActivated() && t.run((new Date).getTime(), this.context)
                    }))
                }

                generateStaticBackground() {
                    return i(this, void 0, void 0, (function* () {
                        let t = document.createElement("canvas"), e = t.getContext("2d");
                        t.width = a.Scaler.getWidth(), t.height = a.Scaler.getHeight(), (0, o.drawBackground)(e, t), this.railInteractivityHandler.updateZoom(), yield this.contentPreview.draw(e), this.rails.reDraw(e), this.background = e.getImageData(0, 0, t.width, t.height)
                    }))
                }

                getBackground() {
                    return this.background
                }

                process(t) {
                    0 != this.detailedContentView.isHidden() && (this.updateLocomotiveDirection(t), this.locomotive.hasReachedDestination() && this.locomotive.direction == r.Direction.Auto && (this.detailedContentView.show(), this.railInteractivityHandler.autopilotDestination = null, this.locomotive.stop()), this.locomotive.move(), this.context.putImageData(this.getBackground(), 0, 0), this.rails.draw(this.context), this.railInteractivityHandler.isPathDragged() && this.contentPreview.drawTargets(this.context), this.locomotive.draw(this.context), this.animate(), t != r.Direction.Idle && this.deactivateHelp())
                }

                updateLocomotiveDirection(t) {
                    null == this.locomotive.autopilotDestinationAsProgress ? this.locomotive.setDirection(t) : this.locomotive.setDirection(r.Direction.Auto)
                }

                zoom() {
                    a.Scaler.updateDimensions(), this.railInteractivityHandler.updateZoom(), this.locomotive.scaleLength(a.Scaler.xLimited(1)), this.generateStaticBackground()
                }

                handlePointerDown(t) {
                    this.railInteractivityHandler.handlePointerDown(t), (this.railInteractivityHandler.isPathDragged() || this.railInteractivityHandler.isNearTile(t)) && this.deactivateHelp()
                }

                handlePointerUp(t) {
                    (this.railInteractivityHandler.isPathDragged() || this.railInteractivityHandler.isNearTile(t)) && (this.railInteractivityHandler.handlePointerUp(t), this.generateStaticBackground()), null != this.railInteractivityHandler.autopilotDestination && this.locomotive.direction != r.Direction.Auto && (this.locomotive.setDestination(this.railInteractivityHandler.autopilotDestination.getDragTargetCenter()), this.detailedContentView.setContent(this.railInteractivityHandler.autopilotDestination.getContent()))
                }

                handlePointerPressedMove(t) {
                    this.railInteractivityHandler.handlePointerPressedMove(t), (this.railInteractivityHandler.isPathDragged() || this.railInteractivityHandler.isNearTile(t)) && this.deactivateHelp()
                }

                deactivateHelp() {
                    this.animations[0].deactivate(), this.animations[1].deactivate()
                }
            }
        }, 34: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.RailInteractivityHandler = void 0;
            const i = n(755), o = n(114);
            e.RailInteractivityHandler = class {
                constructor(t, e) {
                    this.rails = t, this.contentPreview = e, this.autopilotDestination = null, this.activeDragPoint = [], this.updatePath()
                }

                updateZoom() {
                    this.rails.splineBasePoints.forEach((t => {
                        t.updateZoom()
                    })), this.contentPreview.updateZoom(), this.updatePath()
                }

                updatePath() {
                    let t = [];
                    for (const e of this.rails.splineBasePoints) e.updateZoom(), t.push(e.center.toArr());
                    this.rails.path.interpolate(t), this.rails.shouldRedrawRails = !0
                }

                handlePointerDown(t) {
                    this.selectBasePointToDrag(t), this.rails.shouldRedrawDraggable = this.isPathDragged()
                }

                handlePointerUp(t) {
                    this.isNearTile(t) && (this.autoRouteClosestSplineBaseIntoClickedTarget(t), this.updatePath()), this.isPathDragged() && (this.updatePath(), this.contentPreview.setTargetHightlightMode(o.HighlightMode.None), this.autopilotToSelectedTarget(t), this.activeDragPoint.pop(), this.printBasePointCoordinates()), this.rails.shouldRedrawDraggable = !1
                }

                handlePointerPressedMove(t) {
                    if (this.isPathDragged()) {
                        if (this.isTouchingAnotherSplineBasePoint(t)) return;
                        this.contentPreview.setTargetHightlightMode(o.HighlightMode.Light), this.snapPointerToTargetIfNear(t)
                    }
                    this.rails.shouldRedrawDraggable = this.isPathDragged()
                }

                autopilotToSelectedTarget(t) {
                    const e = this.contentPreview.getTargetsUnderPointer(t);
                    0 != e.length && (this.autopilotDestination = e[0])
                }

                autoRouteClosestSplineBaseIntoClickedTarget(t) {
                    let e = this.rails.splineBasePoints[0], n = Number.MAX_SAFE_INTEGER;
                    const i = this.contentPreview.getTileUnderPointer(t);
                    0 != i.length && (this.rails.splineBasePoints.forEach((t => {
                        let o = t.center.distanceTo(i[0].getDragTargetCenter());
                        o < n && (e = t, n = o)
                    })), e.setCenter(i[0].getDragTargetCenter()), this.autopilotDestination = i[0])
                }

                selectBasePointToDrag(t) {
                    for (let e of this.rails.splineBasePoints) e.center.distanceTo(t) < o.DragItem.radius && this.activeDragPoint.push(e)
                }

                printBasePointCoordinates() {
                    let t = "[";
                    this.rails.path.basePoints.forEach((e => {
                        t += "[" + e[0] / i.Scaler.x(1) + ", " + e[1] / i.Scaler.y(1) + "],"
                    })), t += "]", console.log(t)
                }

                snapPointerToTargetIfNear(t) {
                    return this.contentPreview.getTargetsUnderPointer(t).forEach((e => {
                        t = e.getDragTargetCenter(), e.setHightlightMode(o.HighlightMode.Full)
                    })), this.activeDragPoint[0].setCenter(t), t
                }

                isTouchingAnotherSplineBasePoint(t) {
                    for (const e of this.rails.splineBasePoints) {
                        const n = e.center.distanceTo(this.activeDragPoint[0].center), i = e.center.distanceTo(t);
                        if (n > 0 && i < 2.5 * o.DragItem.radius) return !0
                    }
                    return !1
                }

                isPathDragged() {
                    return 0 != this.activeDragPoint.length
                }

                isNearTile(t) {
                    return 0 != this.contentPreview.getTileUnderPointer(t).length
                }
            }
        }, 238: function (t, e, n) {
            "use strict";
            var i = this && this.__awaiter || function (t, e, n, i) {
                return new (n || (n = Promise))((function (o, r) {
                    function s(t) {
                        try {
                            h(i.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }

                    function a(t) {
                        try {
                            h(i.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }

                    function h(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n((function (t) {
                            t(e)
                        }))).then(s, a)
                    }

                    h((i = i.apply(t, e || [])).next())
                }))
            }, o = this && this.__importDefault || function (t) {
                return t && t.__esModule ? t : {default: t}
            };
            Object.defineProperty(e, "__esModule", {value: !0}), n(118), n(644), n(31), n(609), n(142);
            const r = o(n(210));

            class s {
                constructor(t) {
                    this._game = t
                }

                setup() {
                    return i(this, void 0, void 0, (function* () {
                        yield this._game.init(), this.gameLoop()
                    }))
                }

                gameLoop() {
                    requestAnimationFrame(this.gameLoop.bind(this)), this._game.render()
                }
            }

            window.onload = () => {
                new s(new r.default).setup()
            }
        }, 190: function (t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.generateOffsetCurve = e.generateOffsetCurveNegative = e.generateOffsetCurvePositive = e.getIndexOfClosestValue = e.Point = void 0;

            class n {
                constructor(t, e) {
                    this.x = t, this.y = e
                }

                static fromArr(t) {
                    return new n(t[0], t[1])
                }

                toArr() {
                    return [this.x, this.y]
                }

                distanceTo(t) {
                    let e = this.y - t.y, n = this.x - t.x;
                    return Math.sqrt(e * e + n * n)
                }
            }

            function i(t, e, n) {
                let i = n(t, e), o = Math.sqrt(e * e + t * t);
                return i[0] /= o, i[1] /= o, i
            }

            function o(t, e) {
                let n = t[0], i = t[1];
                return {vx: e[0] - n, vy: e[1] - i}
            }

            function r(t, e) {
                return [-e, t]
            }

            function s(t, e) {
                return [e, -t]
            }

            function a(t, e, n) {
                let r = [];
                for (let s = 0; s < t.length - 1; s++) {
                    let a = t[s], h = t[s + 1], {vx: l, vy: c} = o(a, h), d = i(l, c, n);
                    d[0] *= e, d[1] *= e, d[0] += a[0], d[1] += a[1], r.push(d)
                }
                return r
            }

            e.Point = n, e.getIndexOfClosestValue = function (t, e) {
                const n = e.reduce(((e, n) => Math.abs(n[0] - t.x) + Math.abs(n[1] - t.y) < Math.abs(e[0] - t.x) + Math.abs(e[1] - t.y) ? n : e));
                return e.indexOf(n)
            }, e.generateOffsetCurvePositive = function (t, e) {
                return a(t, e, r)
            }, e.generateOffsetCurveNegative = function (t, e) {
                return a(t, e, s)
            }, e.generateOffsetCurve = a
        }, 755: function (t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Scaler = void 0;

            class n {
                static x(t) {
                    return t * n.getWidth() / 2144
                }

                static y(t) {
                    return t * n.getHeight() / 1206
                }

                static xLimited(t, e = .75, i = 3) {
                    let o = n.x(t);
                    return o < e && (o = e), o > i && (o = i), o
                }

                static yLimited(t, e = .75, i = 3) {
                    let o = n.y(t);
                    return o < e && (o = e), o > i && (o = i), o
                }

                static getHeight() {
                    return null === n.height && (n.height = document.getElementById("canvas").getBoundingClientRect().height), n.height
                }

                static getWidth() {
                    return null === n.width && (n.width = document.getElementById("canvas").getBoundingClientRect().width), n.width
                }

                static updateDimensions() {
                    n.width = document.getElementById("canvas").getBoundingClientRect().width, n.height = document.getElementById("canvas").getBoundingClientRect().height
                }
            }

            e.Scaler = n, n.height = null, n.width = null
        }, 142: function (t, e, n) {
            "use strict";
            t.exports = n.p + "arrow.png"
        }, 713: function (t, e, n) {
            "use strict";
            t.exports = n.p + "bricolage.png"
        }, 609: function (t, e, n) {
            "use strict";
            t.exports = n.p + "contactCode.png"
        }, 140: function (t, e, n) {
            "use strict";
            t.exports = n.p + "informatics.png"
        }, 488: function (t, e, n) {
            "use strict";
            t.exports = n.p + "locomotive.png"
        }, 982: function (t, e, n) {
            "use strict";
            t.exports = n.p + "maschinenbau.png"
        }, 424: function (t, e, n) {
            "use strict";
            t.exports = n.p + "Gidole-Regular.ttf"
        }
    }, e = {};

    function n(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var r = e[i] = {id: i, exports: {}};
        return t[i].call(r.exports, r, r.exports, n), r.exports
    }

    n.m = t, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, {a: e}), e
    }, n.d = function (t, e) {
        for (var i in e) n.o(e, i) && !n.o(t, i) && Object.defineProperty(t, i, {enumerable: !0, get: e[i]})
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, n.p = "/portfolio", n.b = document.baseURI || self.location.href, n.nc = void 0, n(238)
}();