import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const created = postsService.create(post);

    expect(created).toEqual(
      expect.objectContaining({
        text: post.text,
        id: expect.any(String),
        date: expect.any(String),
      }),
    );

    const found = postsService.find(created.id);
    expect(found).toEqual(created);
  });

  it('should find a post', () => {
    const created = postsService.create(post);

    const found = postsService.find(created.id);

    expect(found).toEqual(created);
  });
});