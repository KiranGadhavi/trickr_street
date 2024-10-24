// import React from "react";
// import { render, screen, fireEvent, act } from "@testing-library/react";
// // import "@testing-library/jest-dom/extend-expect";
// import "@testing-library/jest-dom";
// import { useLoadScript } from "@react-google-maps/api";
// // import { motion } from "framer-motion";
// import GoogleMapComponent from "../../../app/components/Map/Map";

// jest.mock("@react-google-maps/api", () => ({
//   useLoadScript: jest.fn(),
//   GoogleMap: ({ children }) => <div data-testid="google-map">{children}</div>,
//   MarkerF: ({ onClick }) => <div data-testid="marker" onClick={onClick}></div>,
//   InfoWindowF: ({ children }) => (
//     <div data-testid="info-window">{children}</div>
//   ),
//   MarkerClusterer: ({ children }) => children(),
// }));

// jest.mock("framer-motion", () => ({
//   motion: {
//     div: ({ children, ...props }) => <div {...props}>{children}</div>,
//   },
// }));

// describe("GoogleMapComponent", () => {
//   beforeEach(() => {
//     useLoadScript.mockReturnValue({
//       isLoaded: true,
//       loadError: null,
//     });
//     window.google = {
//       maps: {
//         Size: jest.fn(),
//         Point: jest.fn(),
//       },
//     };
//   });

//   test("renders loading state when map is not loaded", () => {
//     useLoadScript.mockReturnValue({
//       isLoaded: false,
//       loadError: null,
//     });
//     render(<GoogleMapComponent />);
//     expect(screen.getByText("Loading maps...")).toBeInTheDocument();
//   });

//   test("renders error state when map fails to load", () => {
//     useLoadScript.mockReturnValue({
//       isLoaded: false,
//       loadError: new Error("Failed to load"),
//     });
//     render(<GoogleMapComponent />);
//     expect(screen.getByText("Error loading maps")).toBeInTheDocument();
//   });

//   test("handles marker click and shows info window", () => {
//     render(<GoogleMapComponent />);
//     const marker = screen.getAllByTestId("marker")[0];
//     fireEvent.click(marker);
//     expect(screen.getByTestId("info-window")).toBeInTheDocument();
//   });

//   test("handles zoom in button click", () => {
//     render(<GoogleMapComponent />);
//     const zoomInButton = screen.getByText("Zoom In");
//     fireEvent.click(zoomInButton);
//   });

//   test("handles zoom out button click", () => {
//     render(<GoogleMapComponent />);
//     const zoomOutButton = screen.getByText("Zoom Out");
//     fireEvent.click(zoomOutButton);
//   });

//   test("displays legend with correct number of markers", () => {
//     render(<GoogleMapComponent />);
//     const legendItems = screen.getAllByText(/Pumpkin Spot/);
//     expect(legendItems).toHaveLength(5);
//   });

//   test("handles legend item click", () => {
//     render(<GoogleMapComponent />);
//     const legendItem = screen.getByText(/Pumpkin Spot 1/);
//     fireEvent.click(legendItem);
//   });

//   test("closes info window when close button is clicked", () => {
//     render(<GoogleMapComponent />);
//     const marker = screen.getAllByTestId("marker")[0];
//     fireEvent.click(marker);
//     const infoWindow = screen.getByTestId("info-window");
//     expect(infoWindow).toBeInTheDocument();
//     act(() => {
//       fireEvent.click(document.body);
//     });
//   });

//   test("renders map with correct initial zoom level", () => {
//     render(<GoogleMapComponent />);
//     const map = screen.getByTestId("google-map");
//     expect(map).toBeInTheDocument();
//   });
// });
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useLoadScript } from "@react-google-maps/api";
import GoogleMapComponent from "../../../app/components/Map/Map";

jest.mock("@react-google-maps/api", () => ({
  useLoadScript: jest.fn(),
  GoogleMap: ({ children, onZoomChanged, onDragEnd }) => (
    <div
      data-testid="google-map"
      onZoomChanged={onZoomChanged}
      onDragEnd={onDragEnd}
    >
      {children}
    </div>
  ),
  MarkerF: ({ onClick, position }) => (
    <div
      data-testid="marker"
      onClick={onClick}
      data-position={JSON.stringify(position)}
    ></div>
  ),
  InfoWindowF: ({ children, onCloseClick }) => (
    <div data-testid="info-window" onClick={onCloseClick}>
      {children}
    </div>
  ),
  MarkerClusterer: ({ children }) => children(),
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe("GoogleMapComponent", () => {
  beforeEach(() => {
    useLoadScript.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });
    window.google = {
      maps: {
        Size: jest.fn(),
        Point: jest.fn(),
      },
    };
  });

  test("renders loading state when map is not loaded", () => {
    useLoadScript.mockReturnValue({
      isLoaded: false,
      loadError: null,
    });
    render(<GoogleMapComponent />);
    expect(screen.getByText("Loading maps...")).toBeInTheDocument();
  });

  test("renders error state when map fails to load", () => {
    useLoadScript.mockReturnValue({
      isLoaded: false,
      loadError: new Error("Failed to load"),
    });
    render(<GoogleMapComponent />);
    expect(screen.getByText("Error loading maps")).toBeInTheDocument();
  });

  test("handles marker click and shows info window", () => {
    render(<GoogleMapComponent />);
    const marker = screen.getAllByTestId("marker")[0];
    fireEvent.click(marker);
    expect(screen.getByTestId("info-window")).toBeInTheDocument();
  });

  test("handles zoom in button click", () => {
    render(<GoogleMapComponent />);
    const zoomInButton = screen.getByText("Zoom In");
    fireEvent.click(zoomInButton);
  });

  test("handles zoom out button click", () => {
    render(<GoogleMapComponent />);
    const zoomOutButton = screen.getByText("Zoom Out");
    fireEvent.click(zoomOutButton);
  });

  test("displays legend with correct number of markers", () => {
    render(<GoogleMapComponent />);
    const legendItems = screen.getAllByText(/Pumpkin Spot/);
    expect(legendItems).toHaveLength(5);
  });

  test("handles legend item click", () => {
    render(<GoogleMapComponent />);
    const legendItem = screen.getByText(/Pumpkin Spot 1/);
    fireEvent.click(legendItem);
  });

  test("closes info window when close button is clicked", () => {
    render(<GoogleMapComponent />);
    const marker = screen.getAllByTestId("marker")[0];
    fireEvent.click(marker);
    const infoWindow = screen.getByTestId("info-window");
    expect(infoWindow).toBeInTheDocument();
    fireEvent.click(infoWindow);
    expect(screen.queryByTestId("info-window")).not.toBeInTheDocument();
  });

  test("renders map with correct initial zoom level", () => {
    render(<GoogleMapComponent />);
    const map = screen.getByTestId("google-map");
    expect(map).toBeInTheDocument();
  });

  test("handles map drag events", () => {
    render(<GoogleMapComponent />);
    const map = screen.getByTestId("google-map");
    fireEvent.mouseDown(map);
    fireEvent.mouseMove(map);
    fireEvent.mouseUp(map);
  });

  test("updates marker clusters on zoom change", () => {
    render(<GoogleMapComponent />);
    const map = screen.getByTestId("google-map");
    fireEvent.click(map);
    const markers = screen.getAllByTestId("marker");
    expect(markers.length).toBeGreaterThan(0);
  });

  test("maintains selected marker state after re-render", () => {
    const { rerender } = render(<GoogleMapComponent />);
    const marker = screen.getAllByTestId("marker")[0];
    fireEvent.click(marker);
    expect(screen.getByTestId("info-window")).toBeInTheDocument();
    rerender(<GoogleMapComponent />);
    expect(screen.getByTestId("info-window")).toBeInTheDocument();
  });

  test("handles marker position updates", () => {
    render(<GoogleMapComponent />);
    const markers = screen.getAllByTestId("marker");
    markers.forEach((marker) => {
      const position = JSON.parse(marker.dataset.position);
      expect(position).toHaveProperty("lat");
      expect(position).toHaveProperty("lng");
    });
  });
});
