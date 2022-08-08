import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useUrl = () => {
  const router = useRouter();
  const [routerLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (router.isReady) setLoaded(true);
  }, [router.isReady]);

  const { serviceId, barberId, barbershopId } = router.query;

  return {
    routerLoaded,
    url: router.asPath,
    goBack: router.back,
    goTo: router.push,
    // params
    serviceId, barberId, barbershopId
  };
};

export default useUrl;
