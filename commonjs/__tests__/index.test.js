"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../");
describe('doNotTrack', function () {
    beforeEach(function () {
        navigator = {};
        window = {};
    });
    test('doNotTrack() supports standard API', function () {
        // @ts-ignore
        navigator.doNotTrack = '1';
        expect(__1.doNotTrack()).toBe(true);
        // @ts-ignore
        navigator.doNotTrack = '0';
        expect(__1.doNotTrack()).toBe(false);
        // @ts-ignore
        navigator.doNotTrack = 'unspecified';
        expect(__1.doNotTrack()).toBe(null);
    });
    test('doNotTrack() supports window', function () {
        // @ts-ignore
        navigator.doNotTrack = undefined;
        // @ts-ignore
        window.doNotTrack = '1';
        expect(__1.doNotTrack()).toBe(true);
        // @ts-ignore
        window.doNotTrack = '0';
        expect(__1.doNotTrack()).toBe(false);
        // @ts-ignore
        window.doNotTrack = 'unspecified';
        expect(__1.doNotTrack()).toBeNull();
    });
    test('doNotTrack() support yes/no', function () {
        // @ts-ignore
        navigator.doNotTrack = 'yes';
        expect(__1.doNotTrack()).toBe(true);
        // @ts-ignore
        navigator.doNotTrack = 'no';
        expect(__1.doNotTrack()).toBe(false);
    });
    test('doNotTrack() supports ms prefix', function () {
        // @ts-ignore
        navigator.doNotTrack = undefined;
        // @ts-ignore
        window.doNotTrack = undefined;
        // @ts-ignore
        navigator.msDoNotTrack = '1';
        expect(__1.doNotTrack()).toBe(true);
        // @ts-ignore
        navigator.msDoNotTrack = '0';
        expect(__1.doNotTrack()).toBe(false);
        // @ts-ignore
        navigator.msDoNotTrack = 'unspecified';
        expect(__1.doNotTrack()).toBeNull();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9fX3Rlc3RzX18vaW5kZXgudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUFnQztBQUVoQyxRQUFRLENBQUMsWUFBWSxFQUFFO0lBQ3JCLFVBQVUsQ0FBQztRQUNULFNBQVMsR0FBRyxFQUFlLENBQUE7UUFDM0IsTUFBTSxHQUFHLEVBQWdDLENBQUE7SUFDM0MsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsb0NBQW9DLEVBQUU7UUFDekMsYUFBYTtRQUNiLFNBQVMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBO1FBQzFCLE1BQU0sQ0FBQyxjQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUUvQixhQUFhO1FBQ2IsU0FBUyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7UUFDMUIsTUFBTSxDQUFDLGNBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRWhDLGFBQWE7UUFDYixTQUFTLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQTtRQUNwQyxNQUFNLENBQUMsY0FBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDakMsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsOEJBQThCLEVBQUU7UUFDbkMsYUFBYTtRQUNiLFNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBRWhDLGFBQWE7UUFDYixNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQTtRQUN2QixNQUFNLENBQUMsY0FBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFL0IsYUFBYTtRQUNiLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBO1FBQ3ZCLE1BQU0sQ0FBQyxjQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVoQyxhQUFhO1FBQ2IsTUFBTSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUE7UUFDakMsTUFBTSxDQUFDLGNBQVUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDakMsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsNkJBQTZCLEVBQUU7UUFDbEMsYUFBYTtRQUNiLFNBQVMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFBO1FBQzVCLE1BQU0sQ0FBQyxjQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUUvQixhQUFhO1FBQ2IsU0FBUyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7UUFDM0IsTUFBTSxDQUFDLGNBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2xDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLGlDQUFpQyxFQUFFO1FBQ3RDLGFBQWE7UUFDYixTQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUNoQyxhQUFhO1FBQ2IsTUFBTSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFFN0IsYUFBYTtRQUNiLFNBQVMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFBO1FBQzVCLE1BQU0sQ0FBQyxjQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUUvQixhQUFhO1FBQ2IsU0FBUyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUE7UUFDNUIsTUFBTSxDQUFDLGNBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRWhDLGFBQWE7UUFDYixTQUFTLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQTtRQUN0QyxNQUFNLENBQUMsY0FBVSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=