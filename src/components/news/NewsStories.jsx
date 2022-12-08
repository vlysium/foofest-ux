import React from "react";
import "../../styles/news.scss";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Article from "./Article";

function NewsStories({ stories, newButton, newsHeadline }) {
  console.log(stories);
  return (
    <section id="new-section">
      <div>{newsHeadline}</div>
      <div className="story-grid">
        {stories.map((story, index) => (
          <>
            <div className="news-card" key={index}>
              <div
                style={{ backgroundImage: `url(../../public${story.image})` }}
                className="newsImage"
              ></div>
              <div className="storyContent">
                <h4>{story.headline}</h4>
                <p>{story.story}</p>
                <Link to={story.url}>Read More</Link>
                
              </div>
            </div>
          </>
        ))}
        {newButton}
      </div>
    </section>
  );
}

export default NewsStories;
