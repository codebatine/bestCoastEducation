var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function bookCourse(userId, courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userResponse = yield fetch(`http://localhost:3000/users/${userId}`);
        const user = yield userResponse.json();
        const bookedCourses = user.bookedCourses || [];
        bookedCourses.push(courseId);
        const updateResponse = yield fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookedCourses }),
        });
        if (updateResponse.ok) {
            window.alert('Course booked successfully!');
        }
        else {
            window.alert('Failed to book course. Please try again.');
        }
    });
}
