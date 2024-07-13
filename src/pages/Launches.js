import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches } from '../features/launches/launchesSlice';

const Launches = () => {
  const dispatch = useDispatch();
  const launches = useSelector((state) => state.launches.launches);
  const status = useSelector((state) => state.launches.status);
  const error = useSelector((state) => state.launches.error);

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 bg-gray-600">
      <h1 className="text-2xl font-bold mb-4 hover:text-blue-500">SpaceX Launches</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {launches.map((launch) => (
          <div
            key={launch.id}
            className="bg-white p-6 rounded-lg hover:bg-gray-300 shadow-lg transform transition duration-300 hover:scale-90"
          >
            <img src={launch.links.mission_patch} alt={launch.mission_name} className="w-full h-50 object-cover rounded-t-lg mb-4 transform transition duration-300 hover:scale-90" />
            <h2 className="text-xl font-bold mb-2 hover:text-blue-500">{launch.mission_name}</h2>
            <p className="text-gray-700">{new Date(launch.launch_date_local).toLocaleDateString()}</p>
            <p className="text-gray-700">{launch.rocket.rocket_name}</p>
            <p className="text-gray-700">{launch.launch_site.site_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Launches;
