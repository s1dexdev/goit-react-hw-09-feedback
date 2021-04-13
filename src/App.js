import { useState } from 'react';
import PropTypes from 'prop-types';
import Statistics from './components/Statistics/Statistics';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Section from './components/Section/Section';
import Notification from './components/Notification/Notification';

const App = function () {
  const [goodReview, setGoodReview] = useState(0);
  const [neutralReview, setNeutralReview] = useState(0);
  const [badReview, setBadReview] = useState(0);

  const handleIncrement = event => {
    const value = event.target.textContent.toLowerCase();

    switch (value) {
      case 'good':
        setGoodReview(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutralReview(prevState => prevState + 1);
        break;
      case 'bad':
        setBadReview(prevState => prevState + 1);
        break;
    }
  };

  const countTotalFeedback = () => goodReview + neutralReview + badReview;

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();

    return Math.round((goodReview / total) * 100);
  };

  return (
    <Section title="Please leave feedback">
      <FeedbackOptions onLeaveFeedback={handleIncrement} />
      {countTotalFeedback() === 0 && (
        <Notification message="No feedback given" />
      )}
      {countTotalFeedback() > 0 && (
        <Statistics
          good={goodReview}
          neutral={neutralReview}
          bad={badReview}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      )}
    </Section>
  );
};

App.defaultProps = {
  goodReview: 0,
  neutralReview: 0,
  badReview: 0,
};

App.propTypes = {
  goodReview: PropTypes.number.isRequired,
  neutralReview: PropTypes.number.isRequired,
  badReview: PropTypes.number.isRequired,
};

export default App;
