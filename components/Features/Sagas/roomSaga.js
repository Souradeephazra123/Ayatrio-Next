// roomSaga.js

import { call, put, takeEvery } from "redux-saga/effects";
import { setRoomData } from "../Slices/roomSlice";
import axios from "axios";
// Add the import statement for FETCH_ROOM_REQUEST
function* fetchRoomData(action) {
    try {
        const response = yield call(
            axios.get,
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=${action.payload}`
        );
        yield put(setRoomData({ roomData: response.data, status: "succeeded" }));
        // console.log("response from room", response.data);
    } catch (error) {
        console.error("Error fetching room data:", error);
        yield put(setRoomData({ roomData: [], status: "failed" }));
    }
}

export function* watchFetchRoomData() {
        yield takeEvery('FETCH_ROOM_REQUEST', fetchRoomData); // Add FETCH_ROOM_REQUEST to the takeEvery function
}
