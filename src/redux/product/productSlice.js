const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  processor: null,
  motherboard: null,
  powerSupply: null,
  ram: null,
  storage: null,
  monitor: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProcessor: (state, action) => {
      state.processor = action.payload;
    },
    addMotherboard: (state, action) => {
      state.motherboard = action.payload;
    },
    addPowerSupply: (state, action) => {
      state.powerSupply = action.payload;
    },
    addRam: (state, action) => {
      state.ram = action.payload;
    },
    addStorage: (state, action) => {
      state.storage = action.payload;
    },
    addMonitor: (state, action) => {
      state.monitor = action.payload;
    },
    removeProcessor: (state) => {
      state.processor = null;
    },
    removeMotherboard: (state) => {
      state.motherboard = null;
    },
    removePowerSupply: (state) => {
      state.powerSupply = null;
    },
    removeRam: (state) => {
      state.ram = null;
    },
    removeStorage: (state) => {
      state.storage = null;
    },
    removeMonitor: (state) => {
      state.monitor = null;
    },
  },
});
export const {
  addProcessor,
  addMotherboard,
  addPowerSupply,
  addRam,
  addStorage,
  addMonitor,
  removeProcessor,
  removeMotherboard,
  removePowerSupply,
  removeRam,
  removeStorage,
  removeMonitor,
} = productSlice.actions;
export default productSlice.reducer;
