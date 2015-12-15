/* jshint -W117, -W030 */
describe('dataservice', function () {

    beforeEach(function () {
        bard.appModule('app.core');
        bard.inject('$httpBackend', '$q', 'dataservice', '$rootScope');
    });

    it('hello test', function() {
        expect('hello').to.equal('hello');
    });

    it('exists', function() {
        expect(dataservice).to.exist;
    });

    it('getMessage count returns a value', function() {
        dataservice.getMessageCount().then(function(data) {

           //expect('hello').to.equal('x');
           expect(data).to.exist;
        });
        $rootScope.$apply();
    });

    it('getPeople returns an array of people', function() {
        $httpBackend.when('GET', '/api/people').respond(200, [{}]);

        dataservice.getPeople().then(function(data) {
            expect(data).to.exist;
        });
       $httpBackend.flush();
    });

    it('getPeople reports error if server fails', function() {
        $httpBackend.when('GET', '/api/people').respond(500, {description: 'you failed'});

        dataservice.getPeople().catch(function(error) {
            expect(error.data.description).to.match(/you failed/);
        });

        $httpBackend.flush();
    });
});
