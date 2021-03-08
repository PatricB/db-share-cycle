<?php


namespace AppBundle\Controller;

use Pimcore\Controller\FrontendController;
use Pimcore\Http\Exception\ResponseException;
use Pimcore\Templating\Model\ViewModel;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class OAuthController extends FrontendController
{
    const GITHUB_ACCESS_TOKEN_ENDPOINT = 'https://github.com/login/oauth/access_token';

    /**
     * @var HttpClientInterface $client
     */
    private $client;

    public function __construct()
    {
        $this->client = HttpClient::create();
    }

    /**
     * @param Request $request
     * @param ViewModel $view
     *
     * @return JsonResponse
     * @throws ResponseException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    function githubAction(Request $request, ViewModel $view): JsonResponse
    {
        if (empty($code = $request->get('code')) && !is_string($code)) {
            throw new ResponseException(
                new JsonResponse(['error' => true, 'message' => 'Parameter \'code\' missing.'], 400)
            );
        }

        $config = $this->container->getParameter('oauth');

        $tokenRequestParameters = [
            'code'          => $code,
            'client_id'     => $config['github']['client_id'],
            'client_secret' => $config['github']['client_secret']
        ];

        if (!empty($state = $request->get('state'))) {
            $tokenRequestParameters['state'] = $state;
        }

        $tokenResponse = $this->getTokenResponse(self::GITHUB_ACCESS_TOKEN_ENDPOINT, $tokenRequestParameters);

        if($tokenResponse->getStatusCode() !== 200) {
            throw new ResponseException(
                new JsonResponse(['error' => true, 'message' => 'Failed to retrieve access token'], 500)
            );
        }

        if(!is_string($tokenResponseContent = $tokenResponse->getContent())) {
            throw new ResponseException(
                new JsonResponse(['error' => true, 'message' => 'Failed to retrieve access token'], 500)
            );
        }

        return $this->json([
            'data' => $tokenResponse->toArray()
        ]);
    }

    protected function getTokenResponse(string $url, array $parameters)
    {
        return $this->client->request(
            'POST',
            $url,
            [
                'body' => $parameters,
                'headers' => [
                    'accept' => 'application/json'
                ]
            ]
        );
    }
}
