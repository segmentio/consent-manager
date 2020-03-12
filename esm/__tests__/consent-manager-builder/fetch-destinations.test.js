var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import nock from 'nock';
import fetchDestinations from '../../consent-manager-builder/fetch-destinations';
describe('fetchDestinations', function () {
    test('Returns destinations for a writekey', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    nock('https://cdn.segment.com')
                        .get('/v1/projects/123/integrations')
                        .reply(200, [
                        {
                            name: 'Google Analytics',
                            creationName: 'Google Analytics'
                        },
                        {
                            name: 'Amplitude',
                            creationName: 'Amplitude'
                        }
                    ]);
                    _a = expect;
                    return [4 /*yield*/, fetchDestinations(['123'])];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toMatchObject([
                        {
                            id: 'Amplitude',
                            name: 'Amplitude'
                        },
                        {
                            id: 'Google Analytics',
                            name: 'Google Analytics'
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Renames creationName to id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    nock('https://cdn.segment.com')
                        .get('/v1/projects/123/integrations')
                        .reply(200, [
                        {
                            name: 'New Amplitude',
                            creationName: 'Old Amplitude'
                        }
                    ]);
                    _a = expect;
                    return [4 /*yield*/, fetchDestinations(['123'])];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toMatchObject([
                        {
                            id: 'Old Amplitude',
                            name: 'New Amplitude'
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Doesn՚t include duplicate destinations', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    nock('https://cdn.segment.com')
                        .get('/v1/projects/123/integrations')
                        .reply(200, [
                        {
                            name: 'Google Analytics',
                            creationName: 'Google Analytics'
                        },
                        {
                            name: 'Amplitude',
                            creationName: 'Amplitude'
                        }
                    ])
                        .get('/v1/projects/abc/integrations')
                        .reply(200, [
                        {
                            name: 'Google Analytics',
                            creationName: 'Google Analytics'
                        },
                        {
                            name: 'FullStory',
                            creationName: 'FullStory'
                        }
                    ]);
                    _a = expect;
                    return [4 /*yield*/, fetchDestinations(['123', 'abc'])];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toMatchObject([
                        {
                            id: 'Amplitude',
                            name: 'Amplitude'
                        },
                        {
                            id: 'FullStory',
                            name: 'FullStory'
                        },
                        {
                            id: 'Google Analytics',
                            name: 'Google Analytics'
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2gtZGVzdGluYXRpb25zLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvX190ZXN0c19fL2NvbnNlbnQtbWFuYWdlci1idWlsZGVyL2ZldGNoLWRlc3RpbmF0aW9ucy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQTtBQUN2QixPQUFPLGlCQUFpQixNQUFNLGtEQUFrRCxDQUFBO0FBRWhGLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtJQUM1QixJQUFJLENBQUMscUNBQXFDLEVBQUU7Ozs7O29CQUMxQyxJQUFJLENBQUMseUJBQXlCLENBQUM7eUJBQzVCLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQzt5QkFDcEMsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFDVjs0QkFDRSxJQUFJLEVBQUUsa0JBQWtCOzRCQUN4QixZQUFZLEVBQUUsa0JBQWtCO3lCQUNqQzt3QkFDRDs0QkFDRSxJQUFJLEVBQUUsV0FBVzs0QkFDakIsWUFBWSxFQUFFLFdBQVc7eUJBQzFCO3FCQUNGLENBQUMsQ0FBQTtvQkFFSixLQUFBLE1BQU0sQ0FBQTtvQkFBQyxxQkFBTSxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUE7O29CQUF2QyxrQkFBTyxTQUFnQyxFQUFDLENBQUMsYUFBYSxDQUFDO3dCQUNyRDs0QkFDRSxFQUFFLEVBQUUsV0FBVzs0QkFDZixJQUFJLEVBQUUsV0FBVzt5QkFDbEI7d0JBQ0Q7NEJBQ0UsRUFBRSxFQUFFLGtCQUFrQjs0QkFDdEIsSUFBSSxFQUFFLGtCQUFrQjt5QkFDekI7cUJBQ0YsQ0FBQyxDQUFBOzs7O1NBQ0gsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLDRCQUE0QixFQUFFOzs7OztvQkFDakMsSUFBSSxDQUFDLHlCQUF5QixDQUFDO3lCQUM1QixHQUFHLENBQUMsK0JBQStCLENBQUM7eUJBQ3BDLEtBQUssQ0FBQyxHQUFHLEVBQUU7d0JBQ1Y7NEJBQ0UsSUFBSSxFQUFFLGVBQWU7NEJBQ3JCLFlBQVksRUFBRSxlQUFlO3lCQUM5QjtxQkFDRixDQUFDLENBQUE7b0JBRUosS0FBQSxNQUFNLENBQUE7b0JBQUMscUJBQU0saUJBQWlCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFBOztvQkFBdkMsa0JBQU8sU0FBZ0MsRUFBQyxDQUFDLGFBQWEsQ0FBQzt3QkFDckQ7NEJBQ0UsRUFBRSxFQUFFLGVBQWU7NEJBQ25CLElBQUksRUFBRSxlQUFlO3lCQUN0QjtxQkFDRixDQUFDLENBQUE7Ozs7U0FDSCxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsd0NBQXdDLEVBQUU7Ozs7O29CQUM3QyxJQUFJLENBQUMseUJBQXlCLENBQUM7eUJBQzVCLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQzt5QkFDcEMsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFDVjs0QkFDRSxJQUFJLEVBQUUsa0JBQWtCOzRCQUN4QixZQUFZLEVBQUUsa0JBQWtCO3lCQUNqQzt3QkFDRDs0QkFDRSxJQUFJLEVBQUUsV0FBVzs0QkFDakIsWUFBWSxFQUFFLFdBQVc7eUJBQzFCO3FCQUNGLENBQUM7eUJBQ0QsR0FBRyxDQUFDLCtCQUErQixDQUFDO3lCQUNwQyxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUNWOzRCQUNFLElBQUksRUFBRSxrQkFBa0I7NEJBQ3hCLFlBQVksRUFBRSxrQkFBa0I7eUJBQ2pDO3dCQUNEOzRCQUNFLElBQUksRUFBRSxXQUFXOzRCQUNqQixZQUFZLEVBQUUsV0FBVzt5QkFDMUI7cUJBQ0YsQ0FBQyxDQUFBO29CQUVKLEtBQUEsTUFBTSxDQUFBO29CQUFDLHFCQUFNLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUE7O29CQUE5QyxrQkFBTyxTQUF1QyxFQUFDLENBQUMsYUFBYSxDQUFDO3dCQUM1RDs0QkFDRSxFQUFFLEVBQUUsV0FBVzs0QkFDZixJQUFJLEVBQUUsV0FBVzt5QkFDbEI7d0JBQ0Q7NEJBQ0UsRUFBRSxFQUFFLFdBQVc7NEJBQ2YsSUFBSSxFQUFFLFdBQVc7eUJBQ2xCO3dCQUNEOzRCQUNFLEVBQUUsRUFBRSxrQkFBa0I7NEJBQ3RCLElBQUksRUFBRSxrQkFBa0I7eUJBQ3pCO3FCQUNGLENBQUMsQ0FBQTs7OztTQUNILENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=