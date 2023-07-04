
import ContentLoader from 'react-content-loader';

// SkeletonCard component for the placeholder effect
const SkeletonCard = () => (
  <ContentLoader
    speed={2}
    width={260}
    height={300}
    viewBox="0 0 260 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="10" y="10" rx="5" ry="5" width="240" height="150" />
    <rect x="10" y="170" rx="3" ry="3" width="100" height="10" />
    <rect x="10" y="190" rx="3" ry="3" width="180" height="10" />
    <rect x="10" y="230" rx="3" ry="3" width="100" height="10" />
    <rect x="10" y="250" rx="3" ry="3" width="120" height="10" />
  </ContentLoader>
);

export default SkeletonCard;
