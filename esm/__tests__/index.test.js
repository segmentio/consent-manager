import { doNotTrack } from '../';
describe('doNotTrack', function () {
    beforeEach(function () {
        navigator = {};
        window = {};
    });
    test('doNotTrack() supports standard API', function () {
        // @ts-ignore
        navigator.doNotTrack = '1';
        expect(doNotTrack()).toBe(true);
        // @ts-ignore
        navigator.doNotTrack = '0';
        expect(doNotTrack()).toBe(false);
        // @ts-ignore
        navigator.doNotTrack = 'unspecified';
        expect(doNotTrack()).toBe(null);
    });
    test('doNotTrack() supports window', function () {
        // @ts-ignore
        navigator.doNotTrack = undefined;
        // @ts-ignore
        window.doNotTrack = '1';
        expect(doNotTrack()).toBe(true);
        // @ts-ignore
        window.doNotTrack = '0';
        expect(doNotTrack()).toBe(false);
        // @ts-ignore
        window.doNotTrack = 'unspecified';
        expect(doNotTrack()).toBeNull();
    });
    test('doNotTrack() support yes/no', function () {
        // @ts-ignore
        navigator.doNotTrack = 'yes';
        expect(doNotTrack()).toBe(true);
        // @ts-ignore
        navigator.doNotTrack = 'no';
        expect(doNotTrack()).toBe(false);
    });
    test('doNotTrack() supports ms prefix', function () {
        // @ts-ignore
        navigator.doNotTrack = undefined;
        // @ts-ignore
        window.doNotTrack = undefined;
        // @ts-ignore
        navigator.msDoNotTrack = '1';
        expect(doNotTrack()).toBe(true);
        // @ts-ignore
        navigator.msDoNotTrack = '0';
        expect(doNotTrack()).toBe(false);
        // @ts-ignore
        navigator.msDoNotTrack = 'unspecified';
        expect(doNotTrack()).toBeNull();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9fX3Rlc3RzX18vaW5kZXgudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sS0FBSyxDQUFBO0FBRWhDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7SUFDckIsVUFBVSxDQUFDO1FBQ1QsU0FBUyxHQUFHLEVBQWUsQ0FBQTtRQUMzQixNQUFNLEdBQUcsRUFBZ0MsQ0FBQTtJQUMzQyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxvQ0FBb0MsRUFBRTtRQUN6QyxhQUFhO1FBQ2IsU0FBUyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7UUFDMUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRS9CLGFBQWE7UUFDYixTQUFTLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQTtRQUMxQixNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFaEMsYUFBYTtRQUNiLFNBQVMsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFBO1FBQ3BDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyw4QkFBOEIsRUFBRTtRQUNuQyxhQUFhO1FBQ2IsU0FBUyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFFaEMsYUFBYTtRQUNiLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBO1FBQ3ZCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUUvQixhQUFhO1FBQ2IsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7UUFDdkIsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRWhDLGFBQWE7UUFDYixNQUFNLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQTtRQUNqQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNqQyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtRQUNsQyxhQUFhO1FBQ2IsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUE7UUFDNUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRS9CLGFBQWE7UUFDYixTQUFTLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtRQUMzQixNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbEMsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsaUNBQWlDLEVBQUU7UUFDdEMsYUFBYTtRQUNiLFNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQ2hDLGFBQWE7UUFDYixNQUFNLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUU3QixhQUFhO1FBQ2IsU0FBUyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUE7UUFDNUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRS9CLGFBQWE7UUFDYixTQUFTLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQTtRQUM1QixNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFaEMsYUFBYTtRQUNiLFNBQVMsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFBO1FBQ3RDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==