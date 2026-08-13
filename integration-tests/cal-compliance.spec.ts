import * as chai from "chai";
import chaiHttp, { request } from "chai-http";
import "chai/register-should";

import { App } from "../src/app";

const expect = chai.expect;
chai.should();
chai.use(chaiHttp);
let sut: App;

describe("CAL profile", () => {
    before(() => {
        sut = new App();
        sut.start({ log: false });
    });
    after(() => {
        sut.stop();
    });

    describe("Basic checks", () => {
        it("should expose resources", (done) => {
            request
                .execute(sut.server)
                .get("/api/artists")
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });
        it("should expose query", (done) => {
            request
                .execute(sut.server)
                .get("/api/artists")
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });
        it("should expose queryById and returns 404", (done) => {
            request
                .execute(sut.server)
                .get("/api/artists/1")
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.status).eql(404);
                    done();
                });
        });
        it("should expose create/POST", (done) => {
            request
                .execute(sut.server)
                .post("/api/artists")
                .send({})
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should expose update/PUT", (done) => {
            request
                .execute(sut.server)
                .put("/api/artists/1")
                .send({})
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should expose delete/DELETE", (done) => {
            request
                .execute(sut.server)
                .del("/api/artists/1")
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should expose OPTIONS", (done) => {
            request
                .execute(sut.server)
                .options("/api/artists")
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe("CAL-H", () => {
        it("H1 /ping should respond pong", (done) => {
            request
                .execute(sut.server)
                .get("/api/ping")
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.eql({
                        msg: "pong"
                    });
                    done();
                });
        });
        it("H2 /metrics is enabled", (done) => {
            request
                .execute(sut.server)
                .get("/api/metrics")
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status(200);
                    done();
                });
        });
        it("H3 /autodiagnosis is enabled", (done) => {
            request
                .execute(sut.server)
                .get("/api/autodiagnosis")
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status(200);
                    res.body.name.should.eql("alba");
                    res.body.should.have.property("version").eql("1.0.0");
                    res.body.checks.should.be.an("Array");
                    res.body.checks.length.should.eql(2);
                    done();
                });
        });
    });
});
