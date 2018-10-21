import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';


var Request = require("request");

  var server;

describe("Server", () => {
  
    beforeAll(() => {
        server = require("../../service/dataread_nodeJS/server");
    });
    afterAll(() => {
        server.close();
    });
	

	  
	
describe("GET /read", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/read", (req, res) => {
                data.status = res.status;
                data.res = JSON.parse(res);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        
    });  

});

 describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));


}); 
