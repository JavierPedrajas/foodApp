import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISchedule, ISchedulesDict } from "lib/interfaces";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  SCHEDULES_API,
} from "lib/services";
import { RootState } from ".";

export interface SchedulesState {
  schedules: ISchedulesDict;
  isLoading: boolean;
}

const initialState: SchedulesState = {
  schedules: {},
  isLoading: false,
};

export const getSchedules = createAsyncThunk(
  "schedules/getSchedules",
  async () => {
    const response = await getItems(SCHEDULES_API);
    return response as ISchedulesDict;
  }
);

export const addSchedule = createAsyncThunk(
  "schedules/addSchedule",
  async (schedule: ISchedule) => {
    const response = await addItem(SCHEDULES_API, schedule);
    return response as ISchedulesDict;
  }
);

export const updateSchedule = createAsyncThunk(
  "schedules/updateSchedule",
  async (schedule: ISchedule) => {
    const response = await updateItem(SCHEDULES_API, schedule);
    return response as ISchedulesDict;
  }
);

export const deleteSchedule = createAsyncThunk(
  "schedules/deleteSchedule",
  async (schedule: ISchedule) => {
    const response = await deleteItem(SCHEDULES_API, schedule);
    return response as ISchedulesDict;
  }
);

export const schedulesSlice = createSlice({
  name: "schedulesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload;
        state.isLoading = false;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.schedules = action.payload;
        state.isLoading = false;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.schedules = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.schedules = action.payload;
        state.isLoading = false;
      })
      .addCase(getSchedules.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addSchedule.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateSchedule.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteSchedule.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const selectSchedules = (state: RootState) =>
  state.schedulesStore.schedules;
export const selectIsLoadingSchedules = (state: RootState) =>
  state.schedulesStore.isLoading;

export default schedulesSlice.reducer;
